const questions = [
    {
        question: "Which country is the current champion in T20 World Cup?",
        type: "radio",
        options: ["Afghanistan", "India", "England", "South Africa"],
        answer: "India"
    },
    {
        question: "Which of these players didn't play cricket?",
        type: "checkbox",
        options: ["Pandya", "Ronaldo", "Virat", "Messi"],
        answer: ["Ronaldo", "Messi"]
    },
    {
        question: "Which player is known as the run machine in modern cricket?",
        type: "dropdown",
        options: ["Rohit", "Virat", "Gill", "Surya"],
        answer: "Virat"
    },
    {
        question: "Who is the captain of the Indian cricket team?",
        type: "text",
        answer: "Rohit"
    },
    {
        question: "Which Indian bowler recently took a hat-trick in a T20 match?",
        type: "radio",
        options: ["Bumrah", "Shami", "Chahal", "Bhuvneshwar"],
        answer: "Bumrah"
    },
    {
        question: "Which of these players has the most sixes in ODI cricket?",
        type: "checkbox",
        options: ["Rohit Sharma", "MS Dhoni", "Virat Kohli", "Yuvraj Singh"],
        answer: ["Rohit Sharma", "MS Dhoni"]
    },
    {
        question: "Who scored the fastest century in IPL history?",
        type: "dropdown",
        options: ["Chris Gayle", "AB de Villiers", "David Warner", "KL Rahul"],
        answer: "Chris Gayle"
    },
    {
        question: "Who is the head coach of the Indian cricket team?",
        type: "text",
        answer: "Rahul Dravid"
    },
    {
        question: "Which team won the IPL 2023?",
        type: "radio",
        options: ["Mumbai Indians", "Chennai Super Kings", "Delhi Capitals", "Royal Challengers Bangalore"],
        answer: "Chennai Super Kings"
    },
    {
        question: "Which of these players has scored a double century in ODIs?",
        type: "checkbox",
        options: ["Sachin Tendulkar", "Virat Kohli", "Rohit Sharma", "Shikhar Dhawan"],
        answer: ["Sachin Tendulkar", "Rohit Sharma"]
    },
    {
        question: "Who holds the record for the highest individual score in Test cricket?",
        type: "dropdown",
        options: ["Brian Lara", "Sachin Tendulkar", "Virender Sehwag", "Steve Smith"],
        answer: "Brian Lara"
    },
    {
        question: "Who is the current vice-captain of the Indian cricket team?",
        type: "text",
        answer: "Hardik Pandya"
    },
    {
        question: "Which country won the most recent ICC Cricket World Cup?",
        type: "radio",
        options: ["Australia", "England", "India", "New Zealand"],
        answer: "England"
    },
    {
        question: "Which of these players has taken 500 wickets in Test cricket?",
        type: "checkbox",
        options: ["Anil Kumble", "Harbhajan Singh", "Ravichandran Ashwin", "Kapil Dev"],
        answer: ["Anil Kumble", "Harbhajan Singh","Ravichandran Ashwin"]
    },
    {
        question: "Who was named the ICC Men's Cricketer of the Year in 2023?",
        type: "dropdown",
        options: ["Joe Root", "Kane Williamson", "Virat Kohli", "Rohit Sharma"],
        answer: "Virat Kohli"
    },
    {
        question: "Which player has the highest batting average in Test cricket?",
        type: "text",
        answer: "Don Bradman"
    },
    {
        question: "Who are the fast bowlers in the below?",
        type: "checkbox",
        options: ["Jasprit Bumrah", "Mohammed Shami", "Bhuvneshwar Kumar", "Yuzvendra Chahal"],
        answer: ["Jasprit Bumrah", "Mohammed Shami","Bhuvneshwar Kumar"]
    },
    {
        question: "Which player has the most catches in IPL history?",
        type: "dropdown",
        options: ["AB de Villiers", "Suresh Raina", "Rohit Sharma", "MS Dhoni"],
        answer: "Suresh Raina"
    },
    {
        question: "Who is the current coach of Chennai Super Kings?",
        type: "text",
        answer: "Stephen Fleming"
    }
];

let currentPage = 1;
const questionsPerPage = 5;
let userAnswers = {};

function renderQuestions() {
    const start = (currentPage - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    const questionsToDisplay = questions.slice(start, end);

    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    questionsToDisplay.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionLabel = document.createElement('label');
        questionLabel.innerText = q.question;
        questionDiv.appendChild(questionLabel);

        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-container';

        if (q.type === 'radio') {
            q.options.forEach(option => {
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${start + index}`;
                radioInput.value = option;

                const optionLabel = document.createElement('label');
                optionLabel.innerText = option;
                optionLabel.style.marginLeft = '5px';

                if (userAnswers[`question-${start + index}`] === option) {
                    radioInput.checked = true;
                }

                const answerDiv = document.createElement('div');
                answerDiv.appendChild(radioInput);
                answerDiv.appendChild(optionLabel);
                answerContainer.appendChild(answerDiv);
            });
        } else if (q.type === 'checkbox') {
            q.options.forEach(option => {
                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxInput.name = `question-${start + index}`;
                checkboxInput.value = option;

                const optionLabel = document.createElement('label');
                optionLabel.innerText = option;
                optionLabel.style.marginLeft = '5px';

                if (userAnswers[`question-${start + index}`] && userAnswers[`question-${start + index}`].includes(option)) {
                    checkboxInput.checked = true;
                }

                const answerDiv = document.createElement('div');
                answerDiv.appendChild(checkboxInput);
                answerDiv.appendChild(optionLabel);
                answerContainer.appendChild(answerDiv);
            });
        } else if (q.type === 'dropdown') {
            const select = document.createElement('select');
            select.name = `question-${start + index}`;

            q.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.innerText = option;
                if (userAnswers[`question-${start + index}`] === option) {
                    optionElement.selected = true;
                }
                select.appendChild(optionElement);
            });
            answerContainer.appendChild(select);
        } else if (q.type === 'text') {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.name = `question-${start + index}`;
            if (userAnswers[`question-${start + index}`]) {
                textInput.value = userAnswers[`question-${start + index}`];
            }
            answerContainer.appendChild(textInput);
        }

        questionDiv.appendChild(answerContainer);
        questionsContainer.appendChild(questionDiv);
    });

    // Show or hide navigation buttons
    document.getElementById('prev-btn').style.display = currentPage === 1 ? 'none' : 'inline';
    document.getElementById('next-btn').style.display = currentPage * questionsPerPage >= questions.length ? 'none' : 'inline';
    document.getElementById('submit-btn').style.display = currentPage * questionsPerPage >= questions.length ? 'inline' : 'none';
}

function nextPage() {
    saveAnswers();
    if (currentPage * questionsPerPage < questions.length) {
        currentPage++;
        renderQuestions();
    }
}

function prevPage() {
    saveAnswers();
    if (currentPage > 1) {
        currentPage--;
        renderQuestions();
    }
}

function saveAnswers() {
    const start = (currentPage - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    const questionsToDisplay = questions.slice(start, end);

    questionsToDisplay.forEach((q, index) => {
        if (q.type === 'radio') {
            const selectedOption = document.querySelector(`input[name="question-${start + index}"]:checked`);
            if (selectedOption) {
                userAnswers[`question-${start + index}`] = selectedOption.value;
            }
        } else if (q.type === 'checkbox') {
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="question-${start + index}"]:checked`)).map(input => input.value);
            userAnswers[`question-${start + index}`] = selectedOptions;
        } else if (q.type === 'dropdown') {
            const selectedOption = document.querySelector(`select[name="question-${start + index}"]`).value;
            userAnswers[`question-${start + index}`] = selectedOption;
        } else if (q.type === 'text') {
            const textInput = document.querySelector(`input[name="question-${start + index}"]`).value.trim();
            userAnswers[`question-${start + index}`] = textInput;
        }
    });
}

renderQuestions();

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveAnswers();

    let score = 0;

    questions.forEach((q, index) => {
        if (q.type === 'radio') {
            if (userAnswers[`question-${index}`] === q.answer) {
                score++;
            }
        } else if (q.type === 'checkbox') {
            const userAnswer = userAnswers[`question-${index}`] || [];
            if (JSON.stringify(userAnswer.sort()) === JSON.stringify(q.answer.sort())) {
                score++;
            }
        } else if (q.type === 'dropdown') {
            if (userAnswers[`question-${index}`] === q.answer) {
                score++;
            }
        } else if (q.type === 'text') {
            if ((userAnswers[`question-${index}`] || '').trim().toLowerCase() === q.answer.toLowerCase()) {
                score++;
            }
        }
    });

    alert(`Your score is ${score} out of ${questions.length}`);
});

let timerDuration = 300;

function startTimer() {
    const timerElement = document.getElementById('timer');

    const interval = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(interval);
            document.getElementById('quiz-form').submit();
        } else {
            const minutes = Math.floor(timerDuration / 60);
            const seconds = timerDuration % 60;
            timerElement.innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerDuration--;
        }
    }, 1000);
}
window.onload = startTimer