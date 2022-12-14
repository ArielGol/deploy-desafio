import {Router} from '@vaadin/router';
import { state } from '../../state';

export class Welcome extends HTMLElement{
  connectedCallback(){
    this.render();
    const form:any=this.querySelector(".form");
    const formulario=form.shadowRoot.querySelector(".form");
    const inputName=formulario.querySelector(".input_name");
    const inputEmail=formulario.querySelector(".input_email");
    const inputSelect=formulario.querySelector(".select");
    const roomInput=formulario.querySelector(".room_content");
    inputSelect.addEventListener("change",(e:any)=>{
      e.preventDefault();
      const target=e.target;     
      let valueSelect=target.value;
      if(valueSelect==="room existente"){
        console.log("room id");
        roomInput.style.display="block";
      }else{
        roomInput.style.display="none";
      }
    })
    formulario.addEventListener("submit",(e:any)=>{
      e.preventDefault();
      const target=e.target;
      let nameValue=inputName.value;
      let emailValue=inputEmail.value;
      let selectValue=target.select.value;
      state.setEmailAndFullName(emailValue,nameValue);
      if(selectValue==="nuevo room"){
        console.log("crear nuevo room"); 
        this.newRoom();
      }else if(selectValue==="room existente"){
        console.log("room existente");
        let roomValue=target.room.value;
        console.log(roomValue);
        state.setRoomId(roomValue);
        this.roomExist();
      }
      Router.go("/chat");
    })
  }
  newRoom(){
    state.signIn((err)=>{
      if(err)console.error("hubo un error en el signIn");
      state.askNewRoom(()=>{
        state.accessToRoom();
      });
    });
  }
  roomExist(){
    state.signIn((err)=>{
      if(err)console.error("hubo un error en el signIn");
        state.accessToRoom();  
    });
  }
  render(){
    this.innerHTML=`
    <header-el></header-el>
    <div class="content_welcome">
    <text-component variant="title">Bienvenido</text-component>
    <form-component class="form" name="email" nameTwo="nombre" nameThree="select" nameFour="room" label="Email" labelTwo="Tu nombre" labelThree="room" labelFour="room id" button="Comenzar"></form-component>
    </div>
    `;  
  }
}
customElements.define("welcome-page",Welcome);

