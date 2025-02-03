const allQuestions = [
    { question: "A 35-year-old woman has a sore throat, fever, and swollen lymph nodes. What is the most likely diagnosis?", choices: ["Streptococcal Pharyngitis", "Viral Cold", "Sinusitis", "Laryngitis"], correct: "Streptococcal Pharyngitis", difficulty: "easy" },
    { question: "A 25-year-old male complains of mild chest pain after running, along with shortness of breath. What could be the cause?", choices: ["Asthma", "Heartburn", "Pneumonia", "Anxiety"], correct: "Heartburn", difficulty: "easy" },
    { question: "A child has a fever, cough, and a red, blotchy rash on the body. What condition does he most likely have?", choices: ["Measles", "Chickenpox", "Scarlet Fever", "Dengue"], correct: "Measles", difficulty: "easy" },
    { question: "A 45-year-old man feels fatigued and weak after a long workday. He has no fever or body aches. What is the most likely cause?", choices: ["Dehydration", "Diabetes", "Anemia", "Depression"], correct: "Dehydration", difficulty: "easy" },
    { question: "A 50-year-old woman has leg swelling, difficulty breathing, and coughing. She has a history of deep vein thrombosis. What is the most likely diagnosis?", choices: ["Asthma", "Pneumonia", "Pulmonary Embolism", "Heart Failure"], correct: "Pulmonary Embolism", difficulty: "easy" },


    { question: "A 60-year-old man complains of chronic back pain, especially after bending down. The pain doesn’t radiate to the legs. What is the most likely cause?", choices: ["Herniated Disc", "Osteoarthritis", "Spinal Stenosis", "Muscle Strain"], correct: "Osteoarthritis", difficulty: "medium" },
    { question: "A 40-year-old woman presents with weight loss, dry skin, and sensitivity to cold. What is the diagnosis?", choices: ["Hypothyroidism", "Hyperthyroidism", "Cushing’s Syndrome", "Type 1 Diabetes"], correct: "Hypothyroidism", difficulty: "medium" },
    { question: "A 20-year-old male has acute onset of pain in the big toe with redness and swelling. What is the most likely diagnosis?", choices: ["Gout", "Rheumatoid Arthritis", "Osteoarthritis", "Bursitis"], correct: "Gout", difficulty: "medium" },
    { question: "A patient complains of persistent cough, night sweats, and weight loss. A chest x-ray reveals a shadow in the lungs. What could be the cause?", choices: ["Lung Cancer", "Tuberculosis", "Pneumonia", "Bronchitis"], correct: "Tuberculosis", difficulty: "medium" },
    { question: "A 35-year-old woman reports painful, swollen joints. She has a red rash on her cheeks and is sensitive to the sun. What is the most likely diagnosis?", choices: ["Rheumatoid Arthritis", "Systemic Lupus Erythematosus", "Osteoarthritis", "Psoriatic Arthritis"], correct: "Systemic Lupus Erythematosus", difficulty: "medium" },

    { question: "A 55-year-old smoker presents with hemoptysis, chest pain, and unintentional weight loss. What should be the primary concern?", choices: ["Pulmonary Embolism", "Tuberculosis", "Lung Cancer", "Pneumonia"], correct: "Lung Cancer", difficulty: "hard" },
    { question: "A 70-year-old man presents with confusion, memory loss, and difficulty with speech. What condition is suspected?", choices: ["Alzheimer's Disease", "Stroke", "Depression", "Parkinson's Disease"], correct: "Alzheimer's Disease", difficulty: "hard" },
    { question: "A patient with high blood pressure and a family history of heart disease presents with chest pain and shortness of breath. What is the likely diagnosis?", choices: ["Angina Pectoris", "Acute Myocardial Infarction", "Aortic Dissection", "Pulmonary Embolism"], correct: "Acute Myocardial Infarction", difficulty: "hard" },
    { question: "A 65-year-old woman presents with severe abdominal pain, bloating, and changes in bowel habits. What is the most likely cause?", choices: ["Colorectal Cancer", "Diverticulitis", "Irritable Bowel Syndrome", "Pancreatitis"], correct: "Colorectal Cancer", difficulty: "hard" },
    { question: "A 45-year-old man presents with severe, constant pain in his abdomen, along with nausea and vomiting. What is the most likely diagnosis?", choices: ["Acute Appendicitis", "Gallstones", "Pancreatitis", "Peptic Ulcer Disease"], correct: "Pancreatitis", difficulty: "hard" },
  
    { question: "A 60-year-old male presents with muscle weakness, difficulty swallowing, and hoarseness. What is the most likely diagnosis?", choices: ["Amyotrophic Lateral Sclerosis (ALS)", "Myasthenia Gravis", "Guillain-Barré Syndrome", "Parkinson's Disease"], correct: "Amyotrophic Lateral Sclerosis (ALS)", difficulty: "expert" },
    { question: "A 45-year-old woman presents with vision changes, tingling in her limbs, and bladder dysfunction. What is the most likely diagnosis?", choices: ["Multiple Sclerosis", "Guillain-Barré Syndrome", "Parkinson’s Disease", "Stroke"], correct: "Multiple Sclerosis", difficulty: "expert" },
    { question: "A 50-year-old woman complains of severe joint pain that is worse in the morning and improves throughout the day. What condition should be suspected?", choices: ["Rheumatoid Arthritis", "Osteoarthritis", "Lupus", "Gout"], correct: "Rheumatoid Arthritis", difficulty: "expert" },
    { question: "A 30-year-old male has frequent headaches, nausea, and vomiting. A brain MRI shows a tumor. What is the likely type of tumor?", choices: ["Meningioma", "Glioma", "Metastatic Tumor", "Pituitary Adenoma"], correct: "Glioma", difficulty: "expert" },
    { question: "A 40-year-old male presents with progressive weight loss, malaise, and abnormal liver function tests. He also has a history of alcohol use. What condition should be considered?", choices: ["Cirrhosis", "Hepatitis C", "Hepatocellular Carcinoma", "Non-Alcoholic Fatty Liver Disease"], correct: "Hepatocellular Carcinoma", difficulty: "expert" },
    
];

const difficulties = ["easy", "medium", "hard", "expert"];
let currentQuestionIndex = 0;
let timeLeft = 90;
let timerInterval;
let selectedDifficulty = 'easy';
let filteredQuestions = [];
let isQuizCompleted = false;
let scores = {
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0
};

function setDifficulty(level) {
    selectedDifficulty = level;
    document.getElementById("difficulty-container").style.display = "none";

    // Filter questions by difficulty and reset index
    filteredQuestions = allQuestions.filter(q => q.difficulty === selectedDifficulty);
    currentQuestionIndex = 0;
    isQuizCompleted = false;

    // Reset score for this difficulty level
    scores[selectedDifficulty] = 0;

    startGame();
}

function startGame() {
    timeLeft = 90;
    document.getElementById("score").textContent = `Score (${selectedDifficulty}): ${scores[selectedDifficulty]}`;
    document.getElementById("restart-btn").style.display = "none";
    document.getElementById("question-container").style.display = "block";

    showQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 90;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function showQuestion() {
    let questionObj = filteredQuestions[currentQuestionIndex];

    document.getElementById("question").textContent = questionObj.question;
    document.getElementById("choices").innerHTML = questionObj.choices.map(choice =>
        `<button onclick="checkAnswer('${choice}')">${choice}</button>`).join('');

    document.getElementById("back-btn").style.display = "block";
    document.getElementById("next-btn").style.display = "block";
}

function checkAnswer(selectedChoice) {
    if (!isQuizCompleted) {
        let questionObj = filteredQuestions[currentQuestionIndex];

        if (selectedChoice === questionObj.correct) {
            scores[selectedDifficulty]++;
            document.getElementById("score").textContent = `Score (${selectedDifficulty}): ${scores[selectedDifficulty]}`;
        }
    }

    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
        currentQuestionIndex++;
        clearInterval(timerInterval);
        showQuestion();
        startTimer();
    } else {
        isQuizCompleted = true;
        endGame("You completed all questions!");
    }
}

function prevQuestion() {
    document.getElementById("difficulty-container").style.display = "block";
    document.getElementById("question-container").style.display = "none";
    clearInterval(timerInterval);
}

function nextDifficulty() {
    let currentIndex = difficulties.indexOf(selectedDifficulty);
    if (currentIndex < difficulties.length - 1) {
        setDifficulty(difficulties[currentIndex + 1]);
    } else {
        alert("You have completed all difficulties!");
    }
}

function endGame(message) {
    alert(message);
    isQuizCompleted = true;
    clearInterval(timerInterval);

    document.getElementById("back-btn").textContent = "Back to Difficulty";
    document.getElementById("back-btn").onclick = prevQuestion;

    document.getElementById("next-btn").textContent = "Next Difficulty";
    document.getElementById("next-btn").onclick = nextDifficulty;

    document.getElementById("restart-btn").style.display = "block";
}
