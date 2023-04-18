const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
guessLetter(letter) {
  const incorrectText = document.getElementById(`incorrect-letters`);
  const remainingGuessesText = document.getElementById(`remaining-guesses`);
  const wordGuessText = document.getElementById(`word-to-guess`);

    if (!this.word.includes(letter)) {
      this.remainingGuesses--;
      this.incorrectLetters.push(letter);
    } else if (!this.correctLetters.includes(letter)) {
      this.correctLetters.push(letter);
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          this.displayWord = this.displayWord.substr(0, i) + letter + this.displayWord.substr(i + 1);
        }
      }
    }
    incorrectText.textContent = this.incorrectLetters.join(" ");
    remainingGuessesText.textContent = this.remainingGuesses;
    wordGuessText.textContent = this.displayWord;
  }
  // implement the updateScreen function:
  updateScreen() {
    const wordGuessText = document.getElementById(`word-to-guess`);
    const remainingGuessesText = document.getElementById(`remaining-guesses`);
    const incorrectText = document.getElementById(`incorrect-letters`);

    wordGuessText.textContent = this.displayWord;
    remainingGuessesText.textContent = this.remainingGuesses;
    incorrectText.textContent = this.incorrectLetters.join(" ");
  }

  // implement the isGameOver function:
isGameOver() {
  return (this.remainingGuesses < 1 || this.displayWord === this.word);
  }

  // implement the getWinOrLoss function:
getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return "win";
    } else if (this.remainingGuesses < 1) {
      return "loss";
    } else {
      return null;
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = displayWord
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()