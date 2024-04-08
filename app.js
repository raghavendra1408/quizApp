const questions = [
    {
        question: "Which Cricketer Has the Most International Centuries?",
        answer:[
            {text:"Sachin Tendulkar",correct:true},
            {text:"Jacques Kallis",correct:false},
            {text:"Ricky Pointing",correct:false},
            {text:"Virat Kohli",correct:false}
        ]
    },
    {
        question: "Which Cricketer Has the Most International Wickets?",
        answer:[
            {text:"Glenn Mcgrath",correct:false},
            {text:"Shane Warne",correct:false},
            {text:"Anil Kumble",correct:false},
            {text:"Muthiya Mulridharan",correct:true}
        ]
    },
    {
        question: "Which Indian Cricketer Has the First IPL Hunderd?",
        answer:[
            {text:"Virender Sehwag",correct:false},
            {text:"Virat Kohli",correct:false},
            {text:"Manish Pandey",correct:true},
            {text:"Sachin Tendulkar",correct:false}
        ]
    }
];

const questionElement = document.querySelector("#question");
const ansBtn = document.querySelector("#ans-btn");
const nextBtn = document.querySelector("#nextBtn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQuestion = questions[currQuestionIndex];
    let quesNo = currQuestionIndex + 1;
    questionElement.innerHTML = quesNo + ". " + currQuestion.question;
    
    currQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextBtn.innerHTML = `Play Again`;
    nextBtn.style.display = "block";
}
function handleNextBtn(){
    currQuestionIndex++;
    if(currQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener('click', () =>{
    if(currQuestionIndex<questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})
startQuiz();