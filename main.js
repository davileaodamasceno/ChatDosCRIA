function addUser(){
    nomeUsuario=document.getElementById("nomeUsuario").value;
    localStorage.setItem("nomeUsuario", nomeUsuario);
    window.location="salas.html";
}