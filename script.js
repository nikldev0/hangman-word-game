const myWords = [
  'javascript',
  'html',
  'php',
  'css',
  'haskell',
  'python',
  'typescript',
  'rust',
  'scheme',
  'java',
  'kotlin',
  'perl',
  'scala',
  'swift',
  'matlab',
  'sql',
  'golang',
  'ruby',
];

let player = {};

const message = document.querySelector('.message');
const output1 = document.querySelector('.output1');
const output2 = document.querySelector('.output1');
const btn = document.querySelector('button');

// RANDOMISE ARRAY

btn.addEventListener('click', () => {
  output1.innerHTML = "";
  output2.innerHTML = "";
  if(myWords.length > 0){
  btn.style.display = 'none';
  const shuffleMyWords = (myWords) => {
    for (let i = myWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = myWords[i];
      myWords[i] = myWords[j];
      myWords[j] = temp;
    }
    return myWords;
  };
  let theWord = shuffleMyWords(myWords).shift();
  player.solution = theWord.split('');
  buildBoard();
  console.log(player.solution);
} else {
  message.style.color = "black";
  message.innerHTML("no more words");   
} 
});


// BUILD BLANKS TO FILL

function buildBoard() {
  player.solution.forEach(function (letter) {
    console.log(letter);
    let div = document.createElement('div');
    div.classList.add('letter2');
    div.innerText = '_';
    div.myLetter = letter;
    output2.appendChild(div);
  });

// POPULATE ALPHABET AND 
let solutionLetter = document.querySelectorAll(".letter2");
  for (let i = 0; i < 26; i++) {
    let temp = String.fromCharCode(65 + i);
    let div = document.createElement('div');
    div.classList.add('letter');
    div.myLetter = temp;
    let handler = function (e) {
      div.removeEventListener('click', handler);
      div.classList.add('done');
      let counter = 0;
      let guess = 0;
      solutionLetter.forEach(function(letter){
        if(letter.innerHTML != "_"){
          counter++;
        }
        if(letter.myLetter.toUpperCase() === temp){
          letter.innerHTML = temp;
          guess++;
        }
      })
      if(guess>0){
        let mul = guess > 1 ? "times" : "time";
        mes = "You found " + temp + " letter " + guess + " " + mul;
        message.style.color = "green";
      } else {
        message.style.color = "red";
        mes = "Not found";
      }
      let letterLeft = solutionLetter.length - (guess+counter);
      message.innerHTML = mes + "<br>" + letterLeft;
      if(letterLeft<1){
        btn.style.display = "block";
      }
    };

    div.addEventListener('click', handler);
    div.innerHTML = temp;
    output1.appendChild(div);
  }
}
