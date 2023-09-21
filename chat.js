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
  nomeSala = localStorage.getItem("nomeSala");
    
  function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(nomeSala).push({
      name: nomeUsuario,
      message: msg,
      like: 0
    });
  
    document.getElementById("msg").value = "";
  }
  
  function getData() {
    firebase.database().ref("/" + nomeSala).on('value', function (snapshot) {
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key; childData = childSnapshot.val(); 
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Start code
          //console.log(firebase_message_id);
          //console.log(message_data);
          name = message_data['name'];
          message = message_data['message'];
          like = message_data['like'];
          name_with_tag = "<h4> " + name + "<img class='user_tick' width='80px' src='logo.jpg'></h4>";
          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
          span_with_tag = "<span class='bi bi-hand-thumbs-up'> Like: " + like + "</span></button><hr>";
  
          row = name_with_tag + message_with_tag + like_button + span_with_tag;
          document.getElementById("output").innerHTML += row;
          //End code
        }
      });
    });
  }
  getData();
  
  function updateLike(message_id) {
    //console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
   // console.log(updated_likes);
  
    firebase.database().ref(nomeSala).child(message_id).update({
      like: updated_likes
    });
  
  }
  
  function logout(){
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("nomeSala");
    window.location="index.html";
  }
  