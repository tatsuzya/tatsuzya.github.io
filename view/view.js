
/* add event listenter to alphabets*/
var add = function() {
  var l = document.getElementById('alphabet').getElementsByTagName('li');
  for (var i = 0; i < l.length; i++) {
    l[i].style.color ="white";
    l[i].addEventListener('click', clickevent);
  }
}

/* click event listenter(remove click listener to disable multiclick on current alphabet)*/
var clickevent = function(e){
  guess = e.target.innerHTML;
  validate();
  document.getElementById('' + e.target.id).style.color = "#36393E";
  document.getElementById('' + e.target.id).removeEventListener('click', clickevent);
}

/* disable all keys */
var gameover = function() {
  var l = document.getElementById('alphabet').getElementsByTagName('li');
  for (var i = 0; i < l.length; i++) {
    l[i].style.color = "#36393E";
    l[i].removeEventListener('click', clickevent);
  }
}


/*create alphabet as list items*/
var buttons = function() {
  myKeys = document.getElementById('keys');
  letters = document.createElement('ul');

  for (var i = 0; i < alphabets.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li');
    list.id = 'letter' + i;
    list.innerHTML = alphabets[i];
    myKeys.appendChild(letters);
    letters.appendChild(list);
  }
}

/* display lives & scores */
var lives = function() {
  document.getElementById('lives').innerHTML = "Lives :" + life;
  document.getElementById('score').innerHTML = "score:" + score;
  if (life < 1) {
    document.getElementById('lives').innerHTML = "You lose";
    gameover();
  } else if (counter === length) {
    document.getElementById('lives').innerHTML = "You Won";
    gameover();
  }
}

/* reset the game(not including th score)*/
var replay = function(){
  var button = document.getElementById('replay');
  button.addEventListener('click', function(){
    reset();
  });
}

/* set up guessing word and hint*/
var play = function() {
  chosen = hints[Math.floor(Math.random() * hints.length)];
  word = words[hints.indexOf(chosen)];
  length = word.length;
  document.getElementById('hint').innerHTML = "" + chosen;
  inp = document.getElementById('input');
  inps = document.createElement('ul');
  for (var i = 0; i < word.length; i++) {
    inps.id = 'word';
    key = document.createElement('li');
    key.id = 'guess' + i;
    key.innerHTML = "_";
    inp.appendChild(inps);
    inps.appendChild(key);
  }
}

/* load all function during start up */
window.onload = function() {
  if(window.location.href.match('hangman.html')!= null){
    loadWord();
    life = 7;
    buttons();
    play();
    add();
    lives();
    replay();
  }
}
