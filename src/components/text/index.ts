export function initTextEl(){
  class TextComponent extends HTMLElement{
    constructor(){
      super();
      this.render();
    }
    render(){
      const variant=this.getAttribute("variant")||"body";
      const shadow=this.attachShadow({mode:"open"});
      const div=document.createElement("div");
      const style=document.createElement("style");
      style.innerHTML=`
      .title{
        font-weight:700;
        font-size:52px;
      }
      .subtitle{
        font-weight:500;
        font-size:24px;
      }
      .name_sender{
        font-weight:400;
        font-size:14px;
        color: #A5A5A5;
      }
      `;
      div.className=variant;
      div.textContent=this.textContent;
      shadow.appendChild(style);
      shadow.appendChild(div);
    }
  }
  customElements.define("text-component",TextComponent);
}