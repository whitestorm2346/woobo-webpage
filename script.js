// 題庫資料
const questions = [
    {
        question: "台灣的首都是哪裡？",
        options: [
            {
                text: "台北",
                state: ""
            }, 
            {
                text: "高雄",
                state: ""
            }, 
            {
                text: "台中",
                state: ""
            }, 
            {
                text: "新竹",
                state: ""
            }
        ],
        answer: "台北",
        state: 0
    },
    {
        question: "太陽從哪裡升起？",
        options: [
            {
                text: "東",
                state: ""
            }, 
            {
                text: "南",
                state: ""
            }, 
            {
                text: "西",
                state: ""
            }, 
            {
                text: "北",
                state: ""
            }
        ],
        answer: "東",
        state: 0
    },
    {
        question: "1 + 1 等於？",
        options: [
            {
                text: "1",
                state: ""
            }, 
            {
                text: "2",
                state: ""
            }, 
            {
                text: "3",
                state: ""
            }, 
            {
                text: "4",
                state: ""
            }
        ],
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

let timer = null;

const showQuestion = (index) => {
    clearInterval(timer);
    const question_container = document.getElementById("question-container");

    let inner_options = ``;

    questions[index].options.forEach(option => {
        switch(questions[index].state){
            case 0: inner_options += `<div class="option">${option.text}</div>`; break;
            case 1: inner_options += `<div class="option answered ${option.state}">${option.text}</div>`; break;
        }
    });

    let inner_html = `
        <div class="progress-container" id="progress-container" style="display:none;">
            <div class="progress-bar" id="progress-bar"></div>
        </div>

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

    Array.from(options.getElementsByClassName("option")).forEach((option, index2) => {
        option.addEventListener("click", () => {
            if(option.classList.contains("answered")) return;

            const link_btn = document.getElementById(`link-${index + 1}`);

            if (option.textContent !== questions[index].answer) {
                option.classList.add("wrong");
                link_btn.classList.add("link-wrong");
                questions[index].options[index2].state = "wrong";
            }
            else {
                link_btn.classList.add("link-correct");
            }

            Array.from(options.getElementsByClassName("option")).forEach((option2, index3) => {
                option2.classList.add("answered");

                if (option2.textContent === questions[index].answer) {
                    option2.classList.add("correct");
                    questions[index].options[index3].state = "correct";
                }
            });

            questions[index].state = 1;

            // show progress bar
            const progressContainer = document.getElementById("progress-container");
            const progressBar = document.getElementById("progress-bar");

            if (progressContainer && progressBar) {
                progressContainer.style.display = "block";

                let duration = 3; // 5秒
                let elapsed = 0;
                const interval = 100; // 0.1秒一次
                progressBar.style.width = "100%";

                timer = setInterval(() => {
                    elapsed += interval / 1000;
                    let percent = Math.max(0, 100 - (elapsed / duration) * 100);
                    progressBar.style.width = percent + "%";

                    if (elapsed >= duration) {
                        clearInterval(timer);
                        // 若還有下一題，就跳下一題
                        if (index + 1 < questions.length) {
                            showQuestion(index + 1);
                        }
                        else { // 最後一題作答完畢
                            progressContainer.style.display = "none"
                        }
                    }
                }, interval);
            }
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