type Message={
  from:string;
  message: string;
};
import { state } from "../../state";
export class Chat extends HTMLElement{
  connectedCallback(){
    state.subscribe(()=>{
      const currentState=state.getState();
      this.messages=currentState.messages;
      this.render();

    });
    this.render();
  
  }
  messages:Message[]=[];
  addListeners(){
    const form:any=this.querySelector(".submit-message");
    const formulario=form.shadowRoot.querySelector(".form");
    const inputEmail=formulario.querySelector(".email_content");
    const inputSelect=formulario.querySelector(".select_content");
    inputEmail.style.display="none";
    inputSelect.style.display="none";
    formulario.addEventListener("submit",(e:any)=>{
      e.preventDefault();
      const target=e.target;
      state.pushMessage(target["new-message"].value);
  
   
    });
}
  contenedorScroll(){
    const contenerMensajes:any=this.querySelector(".messages");
    contenerMensajes.scrollTop=contenerMensajes.scrollHeight;
  }
  render(){
    this.innerHTML=`
    <header-el></header-el>
    <div class="chat_page">
      <div class="title_subtitle">
        <text-component variant="title">Chat</text-component>
        <text-component variant="subtitle">room id:${state.data.roomId}</text-component>
      </div>
      <div class="chat-content">
        <div class="messages">
          ${this.messages.map(m=>{
            return `<text-component class=${m.from===state.data.fullName?'sent':'receive'} variant="name_sender">${m.from}</text-component>
            <div class=${m.from===state.data.fullName?'sent_message':'receive_message'}>
            <p>${m.message}</p>
            </div>`
            }).join("")}
        </div>
      <form-component class="submit-message" nameTwo="new-message" labelTwo="" button="Enviar"></form-component>
    </div>
    </div>
    `;

    this.contenedorScroll();
    this.addListeners();

  }
}
customElements.define("chat-page",Chat);
