let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

var words = new Array();
var hints = new Array();
/* number of lives*/
let life = 7;
/* choosen word*/
let word;
/* user guess*/
let guess;
/* inputted keys*/
let key;
/* counter for correct input */
let counter = 0;
/* length of the chosen word*/
let length;
/* user score*/
let score = 0;



function loadWord() {
  $.ajax({
    url: 'https://hangman-40aa1.firebaseio.com/wordData.json',
    type: "GET",
    success: function(result) {
      for (let i = 0; i < Object.keys(result).length; i++) {
        words.push(Object.values(result)[i].word);
        hints.push(Object.values(result)[i].hint);
      }
    },
    error: function(error) {
      alert("error: " + error);
    },
    async: false
  });
}
