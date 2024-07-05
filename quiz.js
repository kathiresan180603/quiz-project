let questions = [];
let currentPage = 1;
const questionsPerPage = 5;
let userAnswers = {};

async function fetchQuestions() {
    const response = await fetch('questions.json');
    questions = await response.json();
    renderQuestions();
}

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

document.getElementById('next-btn').addEventListener('click', nextPage);
document.getElementById('prev-btn').addEventListener('click', prevPage);

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

window.onload = () => {
    fetchQuestions();
    startTimer();
};
