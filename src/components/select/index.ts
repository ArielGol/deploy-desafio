export function initSelectEl(){
  class SelectComponent extends HTMLElement{
    constructor(){
      super();
      this.render();
    
    
    }
    render(){
      const shadow=this.attachShadow({mode:"open"});
      const label=this.getAttribute("label");
      const name=this.getAttribute("name");
      const style=document.createElement("style");
      style.innerHTML=`
      .select_content{
        display:flex;
        flex-direction:column;
        gap:5px;
      }
      .label{
        font-weight:500;
        font-size:24px;
      }
      .select{
        font-size:24px;
        border:2px solid #000000;
        font-weight:400;
        padding: 5px 19px;
        border-radius:4px;
        font-family: "Roboto", sans-serif;
        width: -webkit-fill-available;
      }
      `;
      shadow.innerHTML=`
        <form class="select_content">
          <div>
            <label class="label">${label}</label>
          </div>
          <select class="select" name=${name}>
            <option value="">--Elige una opción--</option>
            <option value="nuevo room">Nuevo room</option>
            <option value="room existente">Room existente</option>
          </select>
        </form>
      `;
      shadow.appendChild(style);
      
      };
    }
    customElements.define("select-component",SelectComponent);
  }
  
