// worker.js

// Vanilla IndexedDB-setup
let dbPromise;
function openDatabase() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open("dom-db", 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("snapshot")) {
        db.createObjectStore("snapshot");
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
  return dbPromise;
}

// Internal HTML snapshot
let lastSnapshot = null;

// BroadcastChannel for diffs
const bc = new BroadcastChannel("dom-diffs");

bc.onmessage = async ev => {
  const data = ev.data;
  try {
    const db = await openDatabase();

    // 1) Initial full snapshot
    if (data.type === "initSnapshot") {
      lastSnapshot = data.html;
      // Persist initial HTML
      const tx0 = db.transaction("snapshot", "readwrite");
      tx0.objectStore("snapshot").put(lastSnapshot, "latest");
      tx0.oncomplete = () => bc.postMessage("saved");
      tx0.onerror    = () => bc.postMessage("error");
      return;
    }

    // 2) Mutation batch: apply to lastSnapshot
    const muts = Array.isArray(data) ? data : [];
    lastSnapshot = applyMutsToHTML(lastSnapshot, muts);

    // 3) Persist updated snapshot
    const tx = db.transaction("snapshot", "readwrite");
    tx.objectStore("snapshot").put(lastSnapshot, "latest");
    tx.oncomplete = () => bc.postMessage("saved");
    tx.onerror    = () => bc.postMessage("error");

  } catch (err) {
    console.error("[worker] Snapshot write failed", err);
    bc.postMessage("error");
  }
};

self.addEventListener("close", () => bc.close());

// Apply mutations to an HTML string, return new HTML string
function applyMutsToHTML(html, muts) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  for (const m of muts) {
    const el = getElementByPath(doc.documentElement, m.targetPath);
    if (!el) continue;
    if (m.type === 'attributes') {
      if (m.newValue === null) el.removeAttribute(m.attributeName);
      else el.setAttribute(m.attributeName, m.newValue);
    }
    else if (m.type === 'childList') {
      // For simplicity, ignore childList diffs in this implementation
      // Advanced: incorporate addedNodeSnapshots/removalIndices
    }
  }
  // Serialize back to string
  return new XMLSerializer().serializeToString(doc);
}

// Find element in a parsed document by path 'TAG[0]/DIV[2]/SPAN[1]', etc.
function getElementByPath(root, path) {
  const parts = path.split('/');
  let el = root;
  for (const part of parts) {
    const match = part.match(/(.+)\[(\d+)\]/);
    if (!match) return null;
    const tag = match[1];
    const idx = parseInt(match[2], 10);
    const children = Array.from(el.children).filter(c => c.tagName === tag);
    el = children[idx] || null;
    if (!el) return null;
  }
  return el;
}
