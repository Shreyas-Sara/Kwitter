  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDCBRqTL0OO77imc8xfb1JPw6YlmP9FXqk",
    authDomain: "kwitter-13b6a.firebaseapp.com",
    databaseURL: "https://kwitter-13b6a-default-rtdb.firebaseio.com",
    projectId: "kwitter-13b6a",
    storageBucket: "kwitter-13b6a.appspot.com",
    messagingSenderId: "1058081617455",
    appId: "1:1058081617455:web:6d679af3bcc05e1b01b8da",
    measurementId: "G-2EKZD19CDV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
       childKey  = childSnapshot.key;
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
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}
