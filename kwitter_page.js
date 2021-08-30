
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
	room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/"+room_name).on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
       childKey  = childSnapshot.key;
       childData = childSnapshot.val();
       if(childKey != "purpose")
       {
         firebase_message_id = childKey;
         message_data = childData;

         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];

         final_name = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'></h4>";

         final_message = "<h4 class = 'message_h4'>" + message + "</h4>";

         like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+ " onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like + "</span></button><hr>";

         final_data = final_name + final_message + like_button + span_with_tag;

         document.getElementById("output").innerHTML += final_data;

	      
       }
    });
  });
}

getData();


function updateLike(uid){
  button_id = uid;
  old_likes = document.getElementById(button_id).value;
  updated_like = Number(old_likes) + 1;

  firebase.database().ref(room_name).child(uid).update({
    like: updated_like
  });
}


function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("kwitter.html");
}
