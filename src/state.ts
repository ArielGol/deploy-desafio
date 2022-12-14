import { rtdb } from "./rtdb";
import map from "lodash/map";
const API_BASE_URL= "http://localhost:3000";


const state = {
  data: {
    email:"",
    fullName:"",
    messages:[],
    userId:"",
    roomId:"",
    rtdbRoomId:"",
  },

  listeners: [], // los callbacks
  init(){
    const lastStorageState=localStorage.getItem("state");
},
  listenRoom(){
    const cs=this.getState();
    const roomsRef= rtdb.ref('/rooms/'+cs.rtdbRoomId);
    roomsRef.on('value', (snapshot) => {
    const cs=this.getState();
    const messagesFromServer=snapshot.val();
    console.log(messagesFromServer);
    const messagesList=map(messagesFromServer.messages);
    cs.messages=messagesList;
    this.setState(cs);
  });
  },
  getState() {
    return this.data;
  },
  setNombre(nombre:string){
    const currentState=this.getState();
    console.log(currentState);
    currentState.nombre=nombre;
    console.log(currentState);
    this.setState(currentState);
  },
  async pushMessage(message:string){
    const nombreDelState=this.data.fullName;
    const cs=this.getState();
    await fetch(API_BASE_URL+"/messages/"+cs.rtdbRoomId,{
      method:"post",
      headers:{
        'content-type':"application/json",
      },
      body:JSON.stringify({
        from:nombreDelState,
        message:message
      })
    });
  },
  setState(newState) {
    this.data = newState;
    for (const listener of this.listeners) {
      listener();
    }
    localStorage.setItem("state",JSON.stringify(newState));
    console.log("Soy el state, he cambiado",this.data);
  },
  setEmailAndFullName(email:string,fullName:string){
    const cs=this.getState();
    cs.email=email;
    cs.fullName=fullName;
    this.setState(cs);
  },
  setRoomId(roomId:string){
    const cs=this.getState();
    cs.roomId=roomId;
    this.setState(cs);
  },
  signUp(callback){
    const cs=this.getState();
    if(cs.email){
      fetch(API_BASE_URL+"/signup",{
        method:"post",
        headers:{
          'content-type': 'application/json',
        },
        body:JSON.stringify({email:cs.email,fullName:cs.fullName})
      }).then(res=>{
        return res.json();
      }).then((data)=>{
        cs.userId=data.id;
        this.setState(cs);
        callback();
      });

    }else{
      console.error("No hay un email en el state");
      callback(true);
    }
  },
  signIn(callback){
    const cs=this.getState();
    if(cs.email){
      fetch(API_BASE_URL+"/auth",{
        method:"post",
        headers:{
          'content-type': 'application/json',

        },
        body:JSON.stringify({email:cs.email})
      }).then(res=>{
        return res.json();
      }).then((data)=>{
        cs.userId=data.id;
        this.setState(cs);
        callback();
      });

    }else{
      console.error("No hay un email en el state");
      callback(true);
    }
  },
  askNewRoom(callback){
    const cs=this.getState();
    if(cs.userId){
      fetch(API_BASE_URL+"/rooms",{
        method:"post",
        headers:{
          'content-type': 'application/json',

        },
        body:JSON.stringify({userId:cs.userId})
      }).then(res=>{
        return res.json();
      }).then((data)=>{
        cs.roomId=data.id;
        this.setState(cs);
        if(callback){
          callback();
        }
      });
    }else{
      console.error("No hay userId")
    }
  },
  accessToRoom(callback?){
    const cs=this.getState();
    const roomId=cs.roomId;
    fetch(API_BASE_URL+"/rooms/"+roomId+"?userId="+cs.userId)
    .then(res=>{
      return res.json();
    }).then((data)=>{
      cs.rtdbRoomId=data.rtdbRoomId;
      this.setState(cs);
      this.listenRoom();
      if(callback){
        callback();
      }
      
    });
  },

  // modifica this.data (el state) e invoca los callbacks
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  // recibe callbacks para ser avisados posteriormente
};
export { state };
