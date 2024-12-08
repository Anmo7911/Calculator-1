const quizData = [
    {
      question: 'Who is the current President of India (2024)?',
      options: ['Ram Nath Kovind', 'Droupadi Murmu', 'Pranab Mukherjee', 'A.P.J. Abdul Kalam'],
      answer: 'Droupadi Murmu',
    },
    {
      question: 'Which element has the chemical symbol O?',
      options: ['Oxygen', 'Gold', 'Osmium', 'Oganesson'],
      answer: 'Oxygen',
    },
    {
      question: 'Who is known as the "Little Master" in Indian cricket?',
      options: ['Sourav Ganguly', 'Sunil Gavaskar', 'Kapil Dev', 'Virender Sehwag'],
      answer: 'Sunil Gavaskar',
    },
    {
      question: 'In which year did India gain independence?',
      options: ['1942', '1947', '1950', '1952'],
      answer: '1947',
    },
    {
      question: 'Which team never won IPL tournament"?',
      options: ['RCB', 'SRH', 'RR', 'DC'],
      answer: 'RCB',
    },
    {
      question: 'Who won the IPL 2023?',
      options: ['Mumbai Indians', 'Chennai Super Kings', 'Gujarat Titans', 'Delhi Capitals'],
      answer: 'Chennai Super Kings',
    },
    {
      question: 'Who is the first captain of the Indian cricket team?',
      options: ['Kapil Dev', 'M.S. Dhoni', 'Sourav Ganguly', 'C.K. Nayudu'],
      answer: 'C.K. Nayudu',
    },
    {
      question: 'What is the capital of India?',
      options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
      answer: 'New Delhi',
    },
    {
      question: 'Which famous Indian leader is known for the slogan "Quit India"?',
      options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Patel', 'Subhas Chandra Bose'],
      answer: 'Mahatma Gandhi',
    },
    {
      question: 'Who was the first woman Prime Minister of India?',
      options: ['Indira Gandhi', 'Sonia Gandhi', 'Pratibha Patil', 'Mamata Banerjee'],
      answer: 'Indira Gandhi',
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let contestantName = "";
  let incorrectAnswers = [];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const startButton = document.getElementById('startButton');
  const nameInput = document.getElementById('contestantName');
  const nameContainer = document.getElementById('nameContainer');
  
  // Start quiz after contestant enters their name
  startButton.addEventListener('click', function() {
    contestantName = nameInput.value.trim();
    if (contestantName === "") {
      alert("Please enter your name to start the quiz.");
      return;
    }
    
    // Hide the name input and show the quiz
    nameContainer.style.display = 'none';
    displayQuestion();
    submitButton.style.display = 'inline-block';
    skipButton.style.display = 'inline-block';  // Show skip button
  });
  
  // Function to shuffle array (for randomizing options)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Function to display a question
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
    
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  // Function to check the selected answer
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  // Function to skip the current question
  function skipQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
  
  // Function to display the result
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
  
    resultContainer.innerHTML = `Hello ${contestantName}, you scored ${score} out of ${quizData.length}!`;
  }
  
  // Retry the quiz
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  // Show answers for incorrect questions
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Hello ${contestantName}, you scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  // Event listeners
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  // Add skip button functionality
  const skipButton = document.getElementById('skip');
  skipButton.addEventListener('click', skipQuestion);
  
