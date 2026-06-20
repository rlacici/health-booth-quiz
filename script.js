const STORAGE_KEY = "completed";

const cards = [
  {
    id: 1,
    image: "images/card1.png",
    question: "칫솔을 교체해야 하는 신호는?",
    options: [
      "양치 시간이 길어졌을 때",
      "손잡이 색이 바래졌을 때",
      "칫솔모가 벌어졌을 때"
    ],
    answer: 2
  },
  {
    id: 2,
    image: "images/card2.png",
    question: "잠자는 동안 입속 환경은 어떻게 변할까요?",
    options: [
      "세균이 줄어든다",
      "세균이 늘어나기 쉽다",
      "변화 없다"
    ],
    answer: 1
  },
  {
    id: 3,
    image: "images/card3.png",
    question: "정기적인 구강검진을 받는 가장 큰 이유는?",
    options: [
      "치아 수명을 늘리기 위해서",
      "구강질환을 빨리 발견할 수 있어서",
      "치료 비용을 줄이기 위해서"
    ],
    answer: 1
  },
  {
    id: 4,
    image: "images/card4.png",
    question: "가글제가 양치질을 대신할 수 없는 가장 큰 이유는?",
    options: [
      "치아 사이까지 관리하기 어렵기 때문에",
      "세균막을 닦아낼 수 없기 때문에",
      "구취조절의 역할만 하기 때문에"
    ],
    answer: 1
  },
  {
    id: 5,
    image: "images/card5.png",
    question: "틀니 관리법으로 올바른 것은?",
    options: [
      "잠잘 때는 빼고 찬물에 보관한다 ",
      "치약을 사용하여 닦는다",
      "뜨거운 물에 삶아서 소독한다"
    ],
    answer: 0
  },
  {
    id: 6,
    image: "images/card6.png",
    question: "충치가 생기기 쉬운 습관은 무엇일까요?",
    options: [
      "칫솔을 자주 교체하는 것",
      "물을 자주 마시는 것",
      "당이 들어간 음료를 자주 마시는 것"
    ],
    answer: 2
  },
  {
    id: 7,
    image: "images/card7.png",
    question: "불소도포를 받는 가장 큰 이유는?",
    options: [
      "치아를 하얗게 만들기 위해서",
      "충치 예방효과를 위해서",
      "치석을 제거하기 위해서"
    ],
    answer: 1
  },
  {
    id: 8,
    image: "images/card8.png",
    question: "치실이나 치간칫솔이 필요한 이유는?",
    options: [
      "치아를 하얗게 만들기 위해서",
      "칫솔이 닿지 않는 곳이 있어서",
      "양치 시간을 줄이기 위해서"
    ],
    answer: 1
  },
  {
    id: 9,
    image: "images/card9.png",
    question: "타액(침)의 역할로 가장 알맞은 것은?",
    options: [
      "충치 예방에 도움을 주는 것",
      "치아의 색을 밝게 하는 것",
      "특별한 역할이 없다."
    ],
    answer: 0
  },
  {
    id: 10,
    image: "images/card10.png",
    question: "사랑니를 포함한 영구치 개수는 몇 개일까요?",
    options: [
      "32개",
      "30개",
      "28개"
    ],
    answer: 0
  }
];

let currentCard = null;
let selectedOption = null;

const screens = {
  already: document.getElementById("screen-already"),
  start: document.getElementById("screen-start"),
  card: document.getElementById("screen-card"),
  quiz: document.getElementById("screen-quiz"),
  complete: document.getElementById("screen-complete")
};

const cardImage = document.getElementById("card-image");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const typeError = document.getElementById("type-error");
const quizError = document.getElementById("quiz-error");
const quizWrong = document.getElementById("quiz-wrong");
const participationTime = document.getElementById("participation-time");
const completeAnswerText = document.getElementById("complete-answer-text");
const typeHeading = document.getElementById("type-heading");

function updateTypeHeadingBlink() {
  if (!typeHeading) return;
  const typeSelected = document.querySelector('input[name="health-type"]:checked');
  typeHeading.classList.toggle("type-heading-blink", !typeSelected);
}

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

function formatDateTime(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}`;
}

function pickRandomCard() {
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
}

function renderCardNews(card) {
  currentCard = card;
  cardImage.src = card.image;
  cardImage.alt = "구강건강 카드뉴스";
}

function renderQuiz() {
  if (!currentCard) return;

  selectedOption = null;
  quizQuestion.textContent = currentCard.question;
  quizOptions.innerHTML = "";
  quizError.classList.add("hidden");
  quizWrong.classList.add("hidden");

  currentCard.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = text;
    btn.dataset.index = index;
    btn.addEventListener("click", () => {
      selectedOption = index;
      quizOptions.querySelectorAll(".option-btn").forEach((el) => {
        el.classList.toggle("selected", Number(el.dataset.index) === index);
      });
      quizError.classList.add("hidden");
      quizWrong.classList.add("hidden");
    });
    quizOptions.appendChild(btn);
  });
}

function showComplete() {
  const now = new Date();
  participationTime.textContent = formatDateTime(now);

  if (currentCard) {
    completeAnswerText.textContent = currentCard.options[currentCard.answer];
    completeAnswerText.classList.remove("complete-answer-blink");
    void completeAnswerText.offsetWidth;
    completeAnswerText.classList.add("complete-answer-blink");
  }

  localStorage.setItem(STORAGE_KEY, "true");
  showScreen("complete");
}

function resetParticipation() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function bindTestResetButton() {
  document.getElementById("btn-test-reset").addEventListener("click", resetParticipation);
}

function init() {
  bindTestResetButton();

  if (localStorage.getItem(STORAGE_KEY) === "true") {
    showScreen("already");
    return;
  }

  showScreen("start");
  updateTypeHeadingBlink();

  document.querySelectorAll('input[name="health-type"]').forEach((input) => {
    input.addEventListener("change", () => {
      typeError.classList.add("hidden");
      updateTypeHeadingBlink();
    });
  });

  document.getElementById("btn-start").addEventListener("click", () => {
    const typeSelected = document.querySelector('input[name="health-type"]:checked');
    if (!typeSelected) {
      typeError.classList.remove("hidden");
      return;
    }
    typeError.classList.add("hidden");

    const card = pickRandomCard();
    renderCardNews(card);
    showScreen("card");
  });

  document.getElementById("btn-go-quiz").addEventListener("click", () => {
    renderQuiz();
    showScreen("quiz");
  });

  document.getElementById("btn-check").addEventListener("click", () => {
    if (selectedOption === null) {
      quizError.classList.remove("hidden");
      quizWrong.classList.add("hidden");
      return;
    }

    quizError.classList.add("hidden");

    if (selectedOption === currentCard.answer) {
      showComplete();
    } else {
      quizWrong.classList.remove("hidden");
      selectedOption = null;
      quizOptions.querySelectorAll(".option-btn").forEach((el) => {
        el.classList.remove("selected");
      });
    }
  });
}

init();
