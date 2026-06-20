const STORAGE_KEY = "completed";

const cards = [
  {
    id: 1,
    image: "images/card1.png",
    question: "칫솔을 주기적으로 교체해야 하는 가장 큰 이유는?",
    options: [
      "양치 시간을 줄이기 위해서",
      "치약의 효과를 높이기 위해서",
      "치면세균막을 효과적으로 제거하기 위해서"
    ],
    answer: 2
  },
  {
    id: 2,
    image: "images/card2.png",
    question: "잠자는 동안 입속 환경은 어떻게 변할까요?",
    options: [
      "세균이 줄어든다",
      "침분비가 줄어 세균이 늘어날 수 있다",
      "변화 없다"
    ],
    answer: 1
  },
  {
    id: 3,
    image: "images/card3.png",
    question: "다음 중 정기적인 구강검진을 받는 가장 큰 이유는?",
    options: [
      "치아 수명을 늘리기 위해서",
      "구강질환을 조기에 발견할 수 있어서",
      "치료 비용을 줄이기 위해서"
    ],
    answer: 1
  },
  {
    id: 4,
    image: "images/card4.png",
    question: "구강세정제가 양치질을 대신할 수 없는 가장 큰 이유는?",
    options: [
      "치아 사이까지 관리하기 어렵기 때문에",
      "세균막을 직접 닦아낼 수 없기 때문에",
      "구취조절의 역할만 하기 때문에"
    ],
    answer: 1
  },
  {
    id: 5,
    image: "images/card5.png",
    question: "틀니를 매일 세척해야 하는 가장 큰 이유는?",
    options: [
      "구강 내 세균 증식을 줄이기 위해서",
      "음식 맛을 좋게 하기 위해서",
      "틀니 색깔을 유지하기 위해서"
    ],
    answer: 0
  },
  {
    id: 6,
    image: "images/card6.png",
    question: "당이 들어간 음료를 자주 마시면 충치 위험이 높아질 수 있는 이유는?",
    options: [
      "치아 색이 변하기 때문에",
      "침이 없어지기 때문에",
      "구강 내 세균이 당분을 이용하기 때문에"
    ],
    answer: 2
  },
  {
    id: 7,
    image: "images/card7.png",
    question: "불소도포를 받는 가장 큰 이유는?",
    options: [
      "치아를 하얗게 만들기 위해서",
      "충치 예방에 도움을 받을 수 있어서",
      "치석을 제거하기 위해서"
    ],
    answer: 1
  },
  {
    id: 8,
    image: "images/card8.png",
    question: "치아 사이 관리가 필요한 가장 큰 이유는?",
    options: [
      "치아 색을 유지하기 위해서",
      "구강질환의 위험을 감소시키기 위해서",
      "치아 모양을 유지하기 위해서"
    ],
    answer: 1
  },
  {
    id: 9,
    image: "images/card9.png",
    question: "구강이 건조하면 좋지 않은 이유는?",
    options: [
      "침의 보호 작용이 줄어들 수 있어서",
      "치아 배열이 변할 수 있어서",
      "치아 색이 변할 수 있어서"
    ],
    answer: 0
  },
  {
    id: 10,
    image: "images/card10.png",
    question: "치아 건강이 중요한 이유로 가장 적절한 것은?",
    options: [
      "전신건강과 관련이 있기 때문에",
      "식사 시간이 짧아지기 때문에",
      "웃을 때 보기 좋기 때문에"
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
