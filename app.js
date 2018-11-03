(function() {
  var config = {
    apiKey: "AIzaSyCMNI2NzZ40-5kmz5EyE2PQKg0Qd01ilbA",
    authDomain: "hangman-40aa1.firebaseapp.com",
    databaseURL: "https://hangman-40aa1.firebaseio.com",
    projectId: "hangman-40aa1",
    storageBucket: "hangman-40aa1.appspot.com",
    messagingSenderId: "794869880727"
  };
  firebase.initializeApp(config);

  // const var for elements
  const txtUser = document.getElementById('txtUser');
  const txtPass = document.getElementById('txtPass');
  const txtEmail = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  const btnSave = document.getElementById('save');
  const btnRank = document.getElementById('ranking');
  const newUser = document.getElementById('new');
  const oldUser = document.getElementById('exist');
  const user = document.getElementById('user');
  var unsortName = new Array();
  var sortScore = new Array();
  var unsortScore = new Array();
  var sortName = new Array();


  // function for index.html
  if (window.location.href.match('index.html') != null) {

    // add new event
    newUser.addEventListener('click', e => {
      newUser.style.display = "none";
      btnLogin.style.display = "none";
      btnSignup.style.display = "block";
      oldUser.style.display = "block";
      user.style.display = "block";
      document.getElementById('msg').innerHTML = "";
      e.preventDefault();
    });

    // add exist event
    oldUser.addEventListener('click', e => {
      oldUser.style.display = "none";
      btnLogin.style.display = "block";
      btnSignup.style.display = "none";
      newUser.style.display = "block";
      user.style.display = "none";
      document.getElementById('msg').innerHTML = "";
      e.preventDefault();
    });

    // add login event
    btnLogin.addEventListener('click', e => {
      const email = txtEmail.value;
      const pass = txtPass.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.then(e => {
        window.location.href = "hangman.html";
      });
      promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);
    });

    // add sign up event
    btnSignup.addEventListener('click', e => {
      const email = txtEmail.value;
      const pass = txtPass.value;
      const username = txtUser.value;
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.then(e => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: "" + username,
        });
        firebase.database().ref('users/' + user.uid).set({
          name: "" + username,
          score: "0"
        });
        document.getElementById('msg').innerHTML = "" + successMsg;
      });
      promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);
      firebase.auth().signOut();
    });
  }

  // funcion for hangmant.html
  if (window.location.href.match('hangman.html') != null) {
    // add logout event
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    // add save event
    btnSave.addEventListener('click', e => {
      var user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        score: score
      });
    });

    // add rank event
    btnRank.addEventListener('click', e => {
      window.location.href = "ranking.html";
    });
  }

  if (window.location.href.match('ranking.html') != null) {
    var query = firebase.database().ref("users/").orderByKey();
    var i = 0;
    var title = document.getElementById('rank-page');
    var panel = document.getElementById('rankpanel');

    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var rankName = childSnapshot.val().name;
          unsortName[i] = rankName;
          var rankScore = childSnapshot.val().score;
          sortScore[i] = rankScore;
          unsortScore[i] = rankScore;
          i++;
        });
        sortScore.sort((a, b) => b - a);
        for (let j = 0; j < sortScore.length; j++) {
          for(let k = 0; k < sortScore.length; k++){
            if(sortScore[j] == unsortScore[k]){
              sortName[j] = unsortName[k];
            }
          }
        }
        for(let l = 0; l < sortScore.length-1; l++){
          title.appendChild(panel.cloneNode(true));
        }

        var rName = document.querySelectorAll('#name');
        var rScore = document.querySelectorAll('#score');
        var rRank = document.querySelectorAll('#rank');

        for(let x = 0; x < rName.length; x++){
          rName[x].innerHTML = "" + sortName[x];
          rScore[x].innerHTML = "" + sortScore[x];
          rRank[x].innerHTML = "" + (x + 1);
        }
      });
  }

  // add realtime addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if (window.location.href.match('hangman.html') != null) {
        document.getElementById('displayname').innerHTML = "Welcome! " + firebaseUser.displayName;
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref('users/' + user.uid);

        ref.on("value", snapshot => {
          score = snapshot.val().score;
          document.getElementById('score').innerHTML = "score: " + score;
        });
      }
    } else {
      if (window.location.href.match('hangman.html') != null) {
        window.location.href = "index.html";
      }
    }
  });
}());
