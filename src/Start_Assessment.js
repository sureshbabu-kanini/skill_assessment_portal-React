import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Start_Assessment.css'
// import abraar from '../abraar.jpeg'
// import assessment from '../assesment.svg'
// import allocated from '../allocated (1).svg'
// import kaninilogo from '../kanilogo.svg'
// import dash from '../dash.svg'
// import logout from '../logout.svg'
// import result from '../result.svg'
// import settings from '../setting.svg'
// import teammembers from '../team member.svg'

export default function Start_Assessment() {

  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionMap, setSelectedOptionMap] = useState({});
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 900) {
          clearInterval(timerInterval);
          return 900;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    fetchQuestions();
    fetchUserId();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://localhost:7198/api/Questions');
      setQuestions(response.data);
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get('https://localhost:7242/api/Users/ids');
      const userIDs = response.data;
      localStorage.setItem('user_ids', JSON.stringify(userIDs));
      console.log('User IDs:', userIDs);
    } catch (error) {
      console.log('Error fetching user IDs:', error);
    }
  };
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setNextButtonClicked(true);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptionMap((prevMap) => ({
      ...prevMap,
      [questions[currentQuestionIndex]?.qnId]: option,
    }));
  };
  const submitAnswer = async () => {
  try {
    const questionAnswers = questions.map((question) => ({
      questionId: question.qnId,
      selectedOption: selectedOptionMap[question.qnId] || 0,
    }));

    const answerData = {
      questionAnswers: questionAnswers,
    };

    const response = await axios.post('https://localhost:7198/api/Answers', answerData);
    console.log('Answer submitted:', response.data);

    const questionAnswerss = response.data.questionAnswers;

    // Extract the 'id' values from questionAnswers array
    const answerIds = questionAnswerss.map((answer) => answer.id);

    console.log('Answer IDs:', answerIds);

    // Store the array of answer IDs inside 'ids'
    const ids = answerIds;

    // Store the 'ids' array in local storage
    localStorage.setItem('ids', JSON.stringify(ids));

    let answeredQuestions = 0;
    let unansweredQuestions = 0;
    let wrongAnsweredQuestions = 0;

    questionAnswers.forEach((questionAnswer) => {
      const question = questions.find((q) => q.qnId === questionAnswer.questionId);
      if (questionAnswer.selectedOption !== 0) {
        if (questionAnswer.selectedOption === question.answer) {
          answeredQuestions += 1;
        } else if (questionAnswer.selectedOption !== question.answer) {
          wrongAnsweredQuestions += 1;
        }
      } else {
        unansweredQuestions += 1;
      }
    });

    const timeLeft = getFormattedTime(time);
    console.log(timeLeft);

    const userIdArray = JSON.parse(localStorage.getItem('user_ids'));
    const userId = userIdArray[0]; // Assuming the user_id is stored as the first element in the array

    // 
    // const answerIdss = JSON.parse(localStorage.getItem('ids')); // Retrieve the answer IDs from local storage

    const resultData = {
      totalQuestions: questions.length,
      answeredQuestions: answeredQuestions,
      unansweredQuestions: unansweredQuestions,
      wrongAnsweredQuestions: wrongAnsweredQuestions,
      timeLeft: timeLeft,
      points:answeredQuestions*5,
      // answerIds: answerIdss, // Assign the answer IDs to the AnswerIds property
      users: {
        user_id: userId,
      },
    };

    const resultResponse = await axios.post('https://localhost:7242/api/Results', resultData);
    console.log('Result stored:', resultResponse.data);
  } catch (error) {
    console.log('Error submitting answer:', error);
  }
};

  
  
  function getFormattedTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <>
      <div className="navigational">
        <div className="list-of-topic">
          <ul>
            <li>
              <span className="logo1">
                {/* <img src={dash} /> */}
              </span>
              <span className="logoname">Dashboard</span>
            </li>
            <li>
              <span className="logo1">
                {/* <img src={assessment}/> */}
              </span>
              <span className="logoname">Take Assessment</span>
            </li>
            <li>
              <span className="logo1">
                {/* <img src={allocated}/> */}
              </span>
              <span className="logoname">Allocated Assessment</span>
            </li>
            <li>
              <span className="logo1">
                {/* <img src={result} /> */}
              </span>
              <span className="logoname">Result</span>
            </li>
            <li>
              <span className="logo1">
                {/* <img src={teammembers} /> */}
              </span>
              <span className="logoname">Team Members</span>
            </li>
            <li>
              <span className="logo1">
                {/* <img src={settings} /> */}
              </span>
              <span className="logoname">Settings</span>
            </li>
            <li></li>
          </ul>
        </div>

        <div className="logout">
          Logout
          {/* <img src={logout} alt="" /> */}
        </div>
      </div>
      <div className="companylogo">
        {/* <img src={kaninilogo} alt="" width="95%" height="95%" /> */}
      </div>
      <div className="companyname">kanini</div>
      <div className="companyname1">assessment</div>
      <div className="test"></div>
      <div className="top-bar">
        <span className="material-symbols-outlined" id="notification">
          notifications
        </span>
        {/* <img
          className="rounded-circle"
          src={abraar}
          alt="Generic placeholder image"
          width="30"
          height="30"
        /> */}
      </div>
      <div className="name">subaramaniyam</div>
      <div className="top-bar1"></div>
      <div className="Allocated-Assessment">Allocated Assessment</div>
      <div className="viewcomplete">
        View complete details of all assessed and its corresponding details of employee under your profile
      </div>
      <div className="search">
        <span className="material-symbols-outlined" id="search">
          search
        </span>
        <h6>search here......</h6>
      </div>
      <div className="timer"></div>
      <div className="question-status"></div>
      <div className="questionstatus">Question status</div>
      <button id="div1" className={nextButtonClicked && currentQuestionIndex === 0 ? 'primary' : ''}>1</button>
  <button id="div2" className={nextButtonClicked && currentQuestionIndex === 1 ? 'primary' : ''}>2</button>
  <button id="div3" className={nextButtonClicked && currentQuestionIndex === 2 ? 'primary' : ''}>3</button>
  <button id="div4" className={nextButtonClicked && currentQuestionIndex === 3 ? 'primary' : ''}>4</button>
  <button id="div5" className={nextButtonClicked && currentQuestionIndex === 4 ? 'primary' : ''}>5</button>
  <button id="div6" className={nextButtonClicked && currentQuestionIndex === 5 ? 'primary' : ''}>6</button>
  <button id="div7" className={nextButtonClicked && currentQuestionIndex === 6 ? 'primary' : ''}>7</button>
  <button id="div8" className={nextButtonClicked && currentQuestionIndex === 7 ? 'primary' : ''}>8</button>
  <button id="div9" className={nextButtonClicked && currentQuestionIndex === 8 ? 'primary' : ''}>9</button>
  <button id="div10" className={nextButtonClicked && currentQuestionIndex === 9 ? 'primary' : ''}>10</button>
  <button id="div11" className={nextButtonClicked && currentQuestionIndex === 10 ? 'primary' : ''}>11</button>

      <button id="start-btn">Submit Assessment</button>

      <button id="next-btn" onClick={handleNextQuestion}>
        Next
      </button>
      <button id="start-btn" onClick={submitAnswer}>
        Submit Assessment
      </button>
      <button id="previous-btn">Skip</button>
      <div className="indicator"></div>
      <div className="answered"></div>
      <div className="Answered">Answered</div>
      <div className="notanswered">Not Answered</div>
      <div className="dot"></div>
      <div className="dot1"></div>
      <div className="timer1">Timer</div>
      <div className="time">{getFormattedTime(time)}</div>
      <div className="estimate">Estimate Time</div>
      <div className="points">[5 points]</div>
      <div className="option1" onClick={() => handleOptionSelect(1)}></div>
      <div id="optionanswer">{questions[currentQuestionIndex]?.option1}</div>
      <input type="radio" id="radio1" checked={selectedOption === 1} />

      <div className="option2" onClick={() => handleOptionSelect(2)}></div>
      <div id="option2answer">{questions[currentQuestionIndex]?.option2}</div>
      <input type="radio" id="radio2" checked={selectedOption === 2} />

      <div className="option3" onClick={() => handleOptionSelect(3)}></div>
      <div id="option3answer">{questions[currentQuestionIndex]?.option3}</div>
      <input type="radio" id="radio3" checked={selectedOption === 3} />

      <div className="option4" onClick={() => handleOptionSelect(4)}></div>
      <div id="option4answer">{questions[currentQuestionIndex]?.option4}</div>
      <input type="radio" id="radio4" checked={selectedOption === 4} />
      <div id="question">Questions {currentQuestionIndex + 1} of {questions.length}</div>
      <div className="level">Level :</div>
      <div className="basic">Basic</div>
      <div className="content">ASS04_UXUI_001</div>
      <div className="time-left">Time left</div>
      <div id="question_no_one">{questions[currentQuestionIndex]?.qnInWords}</div>
    </>
  );
}