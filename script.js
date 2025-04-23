// 題庫資料
const questions = [
    {
        question: "台灣的首都是哪裡？",
        options: ["台北", "高雄", "台中", "新竹"],
        answer: "台北"
    },
    {
        question: "太陽從哪裡升起？",
        options: ["東", "西", "南", "北"],
        answer: "東"
    },
    {
        question: "1 + 1 等於？",
        options: ["1", "2", "3", "4"],
        answer: "2"
    }
];

// 題目亂序
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(questions); // 打亂題目順序

const quizContainer = document.getElementById("quiz");

questions.forEach((q, index) => {
    const container = document.createElement("div");
    container.className = "question-container";

    const title = document.createElement("h3");
    title.textContent = `Q${index + 1}. ${q.question}`;
    container.appendChild(title);

    shuffle(q.options); // 打亂選項順序

    q.options.forEach(optionText => {
        const option = document.createElement("div");
        option.className = "option";
        option.textContent = optionText;
        option.addEventListener("click", () => {
        if (option.classList.contains("correct") || option.classList.contains("wrong")) return;

        if (optionText === q.answer) {
            option.classList.add("correct");
        } else {
            option.classList.add("wrong");
            // 顯示正確答案
            const correctOption = [...container.querySelectorAll(".option")]
            .find(opt => opt.textContent === q.answer);
            correctOption.classList.add("correct");
        }
        });
        container.appendChild(option);
    });

    quizContainer.appendChild(container);
});

const initQuestionLinks = () => {
    const question_links = document.getElementById("question-links");

    let inner_html = ``;

    questions.forEach((q, index) => {
        inner_html += `<button class="link" id="link-${index + 1}" onclick="showQuestion(${index + 1})">${index + 1}</button>`;
    });

    question_links.innerHTML = inner_html;
}


document.addEventListener("DOMContentLoaded", function () {
    initQuestionLinks();
});