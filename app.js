const cards = document.querySelectorAll(".memory-card");
const resetButton = document.getElementById("reset");

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
  } else {
    hasFlipped = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    count = count + 2;
    if (count === cards.length) alert("YOU WIN!");
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      lockBoard = false;
    }, 1000);
  }
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();
cards.forEach((card) => card.addEventListener("click", flipCard));

// $(".memory-game").forEach((element) => {
//   element.classList.remove("flip");
// });

// $(".memory-game > div").removeClass('flip');
resetButton.addEventListener("click", resetBtn);

function resetBtn() {
  cards.forEach((card) => card.classList.remove("flip"));
  setTimeout(() => {
    shuffle();
    cards.forEach((card) => card.removeEventListener("click", flipCard));
    cards.forEach((card) => card.addEventListener("click", flipCard));
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    count = 0;
  }, 1000);
}
