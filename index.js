"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("./db");
const cors = require("cors");
const nanoid_1 = require("nanoid");
// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
//Middlewares
app.use(express.json());
app.use(cors());
//Collections
const userCollection = db_1.db.collection("users");
const roomCollection = db_1.db.collection("rooms");
//Endpoint
console.log("Mi nombre es:", process.env.NAME);
//Ejemplo de uso de variable de entorno
/*let user={
  nombre:""
}
if(process.env.ENVIRONMENT==='develop'){
  user.nombre="nombre random"
}*/
app.get("/env", (req, res) => {
    res.json({
        environment: process.env.ENVIRONMENT
    });
});
app.get("/db-env", (req, res) => {
    res.json({
        dbHost: process.env.DB_ADDRESS
    });
});
app.get("/hola", (req, res) => {
    res.json({
        message: "Hola mundo desde el servidor"
    });
});
//signup
app.post("/signup", (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    userCollection.where("email", "==", email).get().then(searchResponse => {
        if (searchResponse.empty) {
            userCollection.add({
                email,
                nombre
            }).then((newUserRef) => {
                res.json({
                    id: newUserRef.id,
                    new: true,
                });
            });
        }
        else {
            /*Primera opcion darle al usuario el id
            res.json({
              //id:searchResponse.docs[0].id,
            //});*/
            //Segunda opcion y es la que usamos status 400 y respondo con mensaje
            res.status(400).json({
                message: "User already exists",
            });
        }
    });
});
//authentication=> para loguearse 
app.post("/auth", (req, res) => {
    // esto es lo mismo que decir const email=req.body.email
    const { email } = req.body;
    userCollection.where("email", "==", email).get().then(searchResponse => {
        if (searchResponse.empty) {
            res.status(404).json({
                message: "not found",
            });
        }
        else {
            /*Primera opcion darle al usuario el id*/
            res.json({
                id: searchResponse.docs[0].id,
            });
        }
    });
});
//Endpoint POST ROOM
app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    userCollection.doc(userId.toString()).get().then((doc) => {
        if (doc.exists) {
            const roomRef = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomRef.set({
                messages: [],
                owner: userId,
            }).then(() => {
                const roomLongId = roomRef.key;
                const roomId = 1000 + Math.floor(Math.random() * 999);
                roomCollection.doc(roomId.toString()).set({
                    rtdbRoomId: roomLongId,
                }).then(() => {
                    res.json({
                        id: roomId.toString(),
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "No existe ese userID",
            });
        }
    });
});
//Endpoint GET ROOM
app.get("/rooms/:roomId", (req, res) => {
    const userId = req.query.userId;
    const { roomId } = req.params;
    userCollection.doc(userId.toString()).get().then((doc) => {
        if (doc.exists) {
            roomCollection.doc(roomId).get().then((snap) => {
                const data = snap.data();
                res.json(data);
            });
            /*const roomRef=rtdb.ref("rooms/" + nanoid());
            roomRef.set({
              messages:[],
              owner:userId,
            }).then(()=>{
              const roomLongId=roomRef.key;
              const roomId=1000+Math.floor(Math.random()*999);
              roomCollection.doc(roomId.toString()).set({
                rtdbRoomId:roomLongId,
              }).then(()=>{
                res.json({
                  id:roomId.toString(),
                });
              });
            });*/
        }
        else {
            res.status(401).json({
                message: "No existe ese userID",
            });
        }
    });
});
//Messages
app.post('/messages/:rtdbRoomId', (req, res) => {
    const idRoom = req.params.rtdbRoomId;
    const roomRef = db_1.rtdb.ref("/rooms/" + idRoom + "/messages");
    roomRef.push(req.body, function () {
        res.json("todo ok");
    });
});
//prueba
app.post("/prueba", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});
app.use(express.static("dist"));
app.get('*', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});
app.listen(PORT, () => {
    console.log(`iniciado en http://localhost:${PORT}`);
});
