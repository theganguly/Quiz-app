// ================================
// MCQ QUIZ APP
// ================================


let selectedExam = "";
let selectedSubject = "";
let selectedTopic = "";
let selectedDifficulty = "";


let currentQuestion = 0;
let score = 0;


const questions = [
    {
        question: "What is the HCF of 12 and 18?",
        options: ["2", "3", "6", "9"],
        answer: "6"
    },
    {
        question: "Which number is a prime number?",
        options: ["4", "6", "7", "9"],
        answer: "7"
    },
    {
        question: "What is 15 + 25?",
        options: ["30", "35", "40", "45"],
        answer: "40"
    },
    {
        question: "What is 100 ÷ 10?",
        options: ["5", "10", "20", "100"],
        answer: "10"
    },
    {
        question: "What is the LCM of 4 and 6?",
        options: ["8", "10", "12", "24"],
        answer: "12"
    },
    {
        question: "Which is an even number?",
        options: ["13", "17", "21", "24"],
        answer: "24"
    },
    {
        question: "What is 9 × 5?",
        options: ["35", "40", "45", "50"],
        answer: "45"
    },
    {
        question: "What is the smallest whole number?",
        options: ["0", "1", "-1", "10"],
        answer: "0"
    },
    {
        question: "What is 50% of 100?",
        options: ["25", "40", "50", "75"],
        answer: "50"
    },
    {
        question: "How many factors does 5 have?",
        options: ["1", "2", "3", "5"],
        answer: "2"
    }
];




// Show one screen and hide the others
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });


    document.getElementById(screenId).classList.remove("hidden");
}




// ================================
// EXAM
// ================================


function selectExam(exam) {
    selectedExam = exam;


    const subjects = {
        SSC: ["Mathematics", "Reasoning", "English", "General Knowledge"],
        Banking: ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
        Railway: ["Mathematics", "Reasoning", "General Science", "General Awareness"],
        UPSC: ["History", "Geography", "Polity", "Economics"],
        Other: ["Mathematics", "Reasoning", "English", "General Knowledge"]
    };


    const subjectList = document.getElementById("subject-list");


    subjectList.innerHTML = "";


    subjects[exam].forEach(subject => {
        const button = document.createElement("button");


        button.textContent = subject;


        button.onclick = function () {
            selectSubject(subject);
        };


        subjectList.appendChild(button);
    });


    showScreen("subject-screen");
}




// ================================
// SUBJECT
// ================================


function selectSubject(subject) {
    selectedSubject = subject;


    const topics = [
        "Number System",
        "Percentage",
        "Ratio and Proportion",
        "Average",
        "Profit and Loss",
        "Time and Work",
        "Time, Speed and Distance",
        "Simple Interest",
        "Compound Interest",
        "Data Interpretation"
    ];


    const topicList = document.getElementById("topic-list");


    topicList.innerHTML = "";


    topics.forEach(topic => {
        const button = document.createElement("button");


        button.textContent = topic;


        button.onclick = function () {
            selectTopic(topic);
        };


        topicList.appendChild(button);
    });


    showScreen("topic-screen");
}




// ================================
// TOPIC
// ================================


function selectTopic(topic) {
    selectedTopic = topic;


    showScreen("difficulty-screen");
}




// ================================
// DIFFICULTY
// ================================


function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;


    currentQuestion = 0;
    score = 0;


    showScreen("quiz-screen");


    showQuestion();
}




// ================================
// SHOW QUESTION
// ================================


function showQuestion() {
    const question = questions[currentQuestion];


    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document.getElementById("question").textContent =
        question.question;


    const optionsContainer = document.getElementById("options");


    optionsContainer.innerHTML = "";


    question.options.forEach(option => {
        const button = document.createElement("button");


        button.textContent = option;


        button.onclick = function () {
            checkAnswer(option);
        };


        optionsContainer.appendChild(button);
    });
}




// ================================
// CHECK ANSWER
// ================================


function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].answer;


    if (selectedAnswer === correctAnswer) {
        score++;
    }


    // Prevent selecting another answer
    document.querySelectorAll("#options button").forEach(button => {
        button.disabled = true;
    });
}




// ================================
// NEXT QUESTION
// ================================


function nextQuestion() {
    currentQuestion++;


    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}




// ================================
// RESULT
// ================================


function showResult() {
    document.getElementById("score").textContent =
        `${score} / ${questions.length}`;


    showScreen("result-screen");
}




// ================================
// BACK BUTTON
// ================================


function goBack(screenId) {
    showScreen(screenId);
}




// ================================
// RESTART
// ================================


function restartQuiz() {
    currentQuestion = 0;
    score = 0;


    showScreen("exam-screen");
}
