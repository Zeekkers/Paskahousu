class Card extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        this.country = this.getAttribute("country");
        this.cardRank = this.getAttribute("card-rank");
      // 🔤 Tekstimuotoinen maa (esim. "risti")
      const maaNimet = {
        '♠': 'pata',
        '♥': 'sydän',
        '♦': 'ruutu',
        '♣': 'risti',
      };
      const maa = maaNimet[this.country] || 'tuntematon';
      const nimi = `${maa} ${this.cardRank}`;
  
      // 🧠 Mikrodata suoraan <card> elementtiin
      this.id = nimi;
      this.setAttribute("itemscope", "");
      this.setAttribute("itemtype", "https://schema.org/GamePiece");
      this.setAttribute("itemprop", "gamePiece");
      this.setAttribute("aria-label", nimi);
  
      // 💾 Mikrodata-elementit (meta tagit)
      const metaName = document.createElement("meta");
      metaName.setAttribute("itemprop", "name");
      metaName.content = nimi;
  
      const metaGame = document.createElement("meta");
      metaGame.setAttribute("itemprop", "game");
      metaGame.content = "paskahousu";
  
      const cornerTop = `<span>${this.cardRank}</span><span>${this.country}</span>`;
      const cornerBottom = `<span>${this.cardRank}</span><span>${this.country}</span>`;
      const centerHTML = this.chooseCenter();
  
      // 🛠️ Tyhjennetään vanha sisältö ja rakennetaan uusi
      this.innerHTML = "";
      this.appendChild(metaName);
      this.appendChild(metaGame);
  
      this.insertAdjacentHTML("beforeend", `
        <frontface>
        <div class="corner top-left" itemprop="identifier">${cornerTop}</div>
        <div class="center">${centerHTML}</div>
        <div class="corner bottom-right">${cornerBottom}</div>
        </frontface>
        <backface>
        <img src="/assets/paskahousu-peli-backface.svg" alt="Pelikortin tausta"/>
        </backface>
      `);
    }
  
    chooseCenter() {
      const c = this.country;
      const r = this.cardRank;
      const maaNimet = {
        '♠': 'pata',
        '♥': 'sydän',
        '♦': 'ruutu',
        '♣': 'risti',
      };
      const maa = maaNimet[c] || 'tuntematon';
  
      const faceMap = {
        'K': { black: 'king-black.svg', red: 'king-red.svg', alt: 'kuningas' },
        'Q': { black: 'queen-black.svg', red: 'queen-red.svg', alt: 'kuningatar' },
        'J': { black: 'jack-black.svg', red: 'jack-red.svg', alt: 'jätkä' },
      };
  
      const isRed = (c === '♥' || c === '♦');
      const color = isRed ? 'red' : 'black';
  
      if (faceMap[r]) {
        const { [color]: img, alt } = faceMap[r];
        return `<img src="/assets/${img}" alt="${maa} ${alt}" itemprop="image">`;
      }
  
      if (r === 'A') {
        return `<figure aria-label="ässä">A</figure>`;
      }
  
      const num = parseInt(r, 10);
      if (!isNaN(num)) {
        const symbolsContainer = document.createElement('div');
        symbolsContainer.className = 'symbols';
      
        for (let i = 0; i < num; i++) {
          const symbol = document.createElement('span');
          symbol.textContent = c;
          symbolsContainer.appendChild(symbol);
        }
      
        return symbolsContainer.outerHTML;
      }
  
      return `<div></div>`;
    }
  }
  
  customElements.define("game-card", Card);
  
  export default Card