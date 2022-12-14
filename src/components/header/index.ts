export function initHeaderEl(){
  class Header extends HTMLElement{
    constructor(){
      super();
      this.render();
    }
    render(){
      this.style.backgroundColor="#FF8282";
      this.style.height="60px";
      this.style.display="flex";
      this.style.justifyContent="center";
      this.style.alignItems="center";
    }
  }
  customElements.define("header-el",Header);
}