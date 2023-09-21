// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT8O0dffDqmhZVNsS71Lbqq0XFuHZC0x4",
  authDomain: "chatdoscria-d1ed2.firebaseapp.com",
  databaseURL: "https://chatdoscria-d1ed2-default-rtdb.firebaseio.com",
  projectId: "chatdoscria-d1ed2",
  storageBucket: "chatdoscria-d1ed2.appspot.com",
  messagingSenderId: "605445155530",
  appId: "1:605445155530:web:73afa47e712e0756aae233"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

nomeUsuario = localStorage.getItem("nomeUsuario");

document.getElementById("nomeUsuario").innerHTML = "Welcome " + nomeUsuario + "!";

function addRoom()
{
  nomeSala = document.getElementById("nomeSala").value;

  firebase.database().ref("/").child(nomeSala).update({
    purpose : "adding room name"
  });

    localStorage.setItem("nomeSala", nomeSala);
    
    window.location = "chat.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("nomeSala", name);
    window.location = "chat.html";
}

function logout() {
localStorage.removeItem("nomeUsuario");
localStorage.removeItem("nomeSala");
    window.location = "index.html";
}