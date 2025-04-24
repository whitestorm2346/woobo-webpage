// 題庫資料
const questions = [
    {
        question: "台灣的首都是哪裡？",
        options: ["台北", "高雄", "台中", "新竹"],
        answer: "台北",
        state: 0
    },
    {
        question: "太陽從哪裡升起？",
        options: ["東", "西", "南", "北"],
        answer: "東",
        state: 0
    },
    {
        question: "1 + 1 等於？",
        options: ["1", "2", "3", "4"],
        answer: "2",
        state: 0
    }
];

// 題目亂序
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(questions); // 打亂題目順序

const showQuestion = (index) => {
    const question_container = document.getElementById("question-container");

    let inner_options = ``;

    questions[index].options.forEach(optionText => {
        switch(questions[index].state){
            case 0: inner_options += `<div class="option">${optionText}</div>`; break;
            case 1: inner_options += `<div class="option answered">${optionText}</div>`; break;
        }
    });

    let inner_html = `
        <div class="question-title">
          <span>Q${index + 1}.</span>
          ${questions[index].question}
        </div>

        <div class="options" id="q${index + 1}-options">
          ${inner_options}
        </div>
    `;

    question_container.innerHTML = inner_html;

    const options = document.getElementById(`q${index + 1}-options`);

    Array.from(options.getElementsByClassName("option")).forEach((option) => {
        option.addEventListener("click", () => {
            if(option.classList.contains("answered")) return;

            const link_btn = document.getElementById(`link-${index + 1}`);

            if (option.textContent !== questions[index].answer) {
                option.classList.add("wrong");
                link_btn.classList.add("link-wrong");
            }
            else {
                link_btn.classList.add("link-correct");
            }

            Array.from(options.getElementsByClassName("option")).forEach((option2) => {
                option2.classList.add("answered");

                if (option2.textContent === questions[index].answer) {
                    option2.classList.add("correct");
                }
            });

            questions[index].state = 1;
        });
    });
};

const initQuestionLinks = () => {
    const question_links = document.getElementById("question-links");

    let inner_html = ``;

    questions.forEach((q, index) => {
        inner_html += `<button class="link" id="link-${index + 1}" onclick="showQuestion(${index})">${index + 1}</button>`;
    });

    question_links.innerHTML = inner_html;
};

const initQuestions = () => {
    shuffle(questions);

    questions.forEach((q, index) => {
        shuffle(q.options);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    initQuestionLinks();
    initQuestions();
    showQuestion(0);
    
});