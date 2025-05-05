// restoreDOM.js

(async function() {
  // 1) Open IndexedDB
  const db = await new Promise((resolve, reject) => {
    const req = indexedDB.open('dom-db', 1);
    req.onupgradeneeded = () => {
      const idb = req.result;
      if (!idb.objectStoreNames.contains('snapshot')) {
        idb.createObjectStore('snapshot');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  // 2) Read latest snapshot
  const html = await new Promise((resolve, reject) => {
    const tx = db.transaction('snapshot', 'readonly');
    const store = tx.objectStore('snapshot');
    const getReq = store.get('latest');
    getReq.onsuccess = () => resolve(getReq.result);
    getReq.onerror = () => reject(getReq.error);
  });

  // 3) If snapshot exists, restore immediately
  if (typeof html === 'string') {
    document.open();
    document.write(html);
    document.close();
    console.log('[RESTORE] DOM snapshot restored');
  }
})();
