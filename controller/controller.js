/* validate whether if the guessed letter is contained in the word*/
var validate = function() {
  for (var i = 0; i < word.length; i++) {
    if (word[i].toUpperCase() == guess) {
      document.getElementById('guess' + i).innerHTML = "" + guess;
      counter++;
      score++;
    }
  }
  var j = (word.toUpperCase().indexOf(guess));
  if (j === -1) {
    life--;
    score--;
    lives();
  } else {
    lives();
  }
}

/* reset the game(excluding score) */
var reset = function() {
  inps.parentNode.removeChild(inps);
  life = 7;
  counter = 0;
  length = 0;
  play();
  lives();
  add();
}
