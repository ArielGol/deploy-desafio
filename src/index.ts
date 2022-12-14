import "./pages/welcome/index";
import "./pages/chatroom/index";
import { state } from "./state";
import "./router";

import { initHeaderEl } from "./components/header";
import {initTextEl} from "./components/text";
import {initFormEl} from "./components/form";
import { initSelectEl } from "./components/select";


(function(){

initHeaderEl();
initTextEl();
initFormEl();
initSelectEl();
state.listenRoom();
//Esto sucede en submit del form de la primera pantalla
//state.setEmailAndFullName("ari@apx.school","Ariel");

/*state.signIn((err)=>{
  if(err)console.error("hubo un error en el signIn");
  state.askNewRoom(()=>{
    state.accessToRoom();
  });
});*/
/*//Al comenzar (propuesta para evitar la primera pantalla)
state.init();
//Recupera el state del localstorage
const cs=state.getState();
if(cs.rtdbRoomId && cs.userId){
   Router.push("/chat"); 
  };
*/})();