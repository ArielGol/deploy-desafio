export function initFormEl(){
  class FormComponent extends HTMLElement{
    constructor(){
      super();
      this.render();
      
    
    }
    render(){
      const shadow=this.attachShadow({mode:"open"});
      const label=this.getAttribute("label");
      const name=this.getAttribute("name");
      const labelTwo=this.getAttribute("labelTwo");
      const nameTwo=this.getAttribute("nameTwo");
      const labelThree=this.getAttribute("labelThree");
      const nameThree=this.getAttribute("nameThree");
      const labelFour=this.getAttribute("labelFour");
      const nameFour=this.getAttribute("nameFour");
      const nameButton=this.getAttribute("button");
      const style=document.createElement("style");
      style.innerHTML=`
      .form{
        display:flex;
        flex-direction:column;
        gap:5px;
      }
      .label{
        font-weight:500;
        font-size:24px;
      }
      .input{
        font-size:24px;
        border:2px solid #000000;
        font-weight:400;
        padding: 5px 19px;
        border-radius:4px;
        font-family: "Roboto", sans-serif;
        width: -webkit-fill-available;
      }
      .button{
        background-color:#9CBBE9;
        font-family: "Roboto", sans-serif;
        font-weight:500;
        font-size:22px;
        border:none;
        border-radius:4px;
        width:100%;
        height:55px;
      }
      .room_content{
        display:none;
      }
      `;
      shadow.innerHTML=`
      <form class="form">
        <div class="email_content">
          <div>
            <label class="label">${label}</label>
          </div>
          <input class="input input_email" name=${name} type="email" />
        </div>
        <div class="name_content">
          <div>
            <label class="label">${labelTwo}</label>
          </div>
          <input class="input input_name" name=${nameTwo} type="text" />
        </div>
      <div class="select_content">
        <div>
          <label class="label">${labelThree}</label>
        </div>
        <select class="input select" name=${nameThree}>
          <option value="">--Elige una opción--</option>
          <option value="nuevo room">Nuevo room</option>
          <option value="room existente">Room existente</option>
        </select>
      </div>
    <div class="room_content">
      <div>
        <label class="label">${labelFour}</label>
      </div>
      <input class="input input_room" id="room" name=${nameFour} type="text" />
    </div>   
          <button class="button">${nameButton}</button>
      </form>
      `;
      shadow.appendChild(style);
      
      };
    }
    customElements.define("form-component",FormComponent);
  }
  
