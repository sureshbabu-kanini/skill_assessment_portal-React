import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../StartAssessment.css'
// import abraar from '../abraar.jpeg'
// import assessment from '../assesment.svg'
import allocated from './assets/TeamMembersCard/allocateass.svg'
import kaninilogo from './assets/TeamMembersCard/kaninilogo.svg'
import dash from './assets/TeamMembersCard/allocateass.svg'
import logout from './assets/TeamMembersCard/logout.svg'
import result from './assets/TeamMembersCard/result.svg'
import settings from './assets/TeamMembersCard/setting.svg'
import teammembers from './assets/TeamMembersCard/teammem.svg'

export default function Start_Assessment() {

  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionMap, setSelectedOptionMap] = useState({});
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [startTimeString, setStartTimeString] = useState(null); // New state variable to store formatted start time
// const [endTimeString, setEndTimeString] = useState(null); // New state variable to store formatted end time
const [assessmentId, setAssessmentId] = useState(null);

const topicId = localStorage.getItem('randomCourseID');
const userId = localStorage.getItem('userID');
 const asseessmentid=localStorage.getItem('assessmentId');

  useEffect(() => {
    const initialTime = 900; // 15 minutes in seconds
    setTime(initialTime);
  
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  

  useEffect(() => {
    fetchQuestions();
    // fetchUserId();
    fetchUserDetails();
  }, []);

  
  const fetchQuestions = async () => {
    try {

      const startTime = new Date();
      const startTimeString = startTime.toLocaleString('en-IN', { hour12: true });
      setStartTimeString(startTimeString);
      console.log(topicId);
      const response = await axios.get(`https://localhost:7198/api/Questions/topicid?topicId=${topicId}`);

      setQuestions(response.data);
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  };

  // const fetchUserId = async () => {
  //   try {
  //     const response = await axios.get('https://localhost:7242/api/Users/ids');
  //     const userIDs = response.data;
  //     localStorage.setItem('user_ids', JSON.stringify(userIDs));
  //     console.log('User IDs:', userIDs);
  //   } catch (error) {
  //     console.log('Error fetching user IDs:', error);
  //   }
  // };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setNextButtonClicked(true);
    }
  };

  const handleQuestionButtonClick = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
    setNextButtonClicked(true);
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
      topicId: topicId,
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

   

    const endTime = new Date();
    const endTimeString = endTime.toLocaleString('en-IN', { hour12: true });


    // const userIdArray = JSON.parse(localStorage.getItem('user_ids'));
    // const userId = userIdArray[0]; // Assuming the user_id is stored as the first element in the array
    
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
      starttime: startTimeString,
      endtime:endTimeString,

      assessment: {
        assessment_ID: asseessmentid,
      
      }
    };

    try {
      // ... (existing code)
  
      // After successfully storing the result
      const assessmentIdToUpdate = asseessmentid; // Get the assessment ID from state  
      const updateAssessmentResponse = await axios.put(
        `https://localhost:7198/api/Assessments/${assessmentIdToUpdate}?newAssessmentType=${"finished"}`,
      );
      console.log('Assessment updated:', updateAssessmentResponse.data);
    } catch (error) {
      console.log('Error submitting answer:', error);
    }

    const resultResponse = await axios.post('https://localhost:7198/api/Results', resultData);
    console.log('Result stored:', resultResponse.data);
  } catch (error) {
    console.log('Error submitting answer:', error);
  }
};
const fetchUserDetails = async () => {
  try {
    // Assuming the user_id is stored as the first element in the array
    const response = await axios.get(`https://localhost:7198/api/Assessments/max-assessment/${userId}`);
    const assessmentIds = response.data.assessment_Id;
    setUserDetails(assessmentIds); // Set the assessment IDs to state
    setAssessmentId(assessmentIds[0]); // Store the first assessment_id in the state variable
    localStorage.setItem('assessment_ids', JSON.stringify(assessmentIds));
    console.log('Assessment IDs:', assessmentIds);
  } catch (error) {
    console.log('Error fetching assessment IDs:', error);
  }
};
const handleSkipQuestion = () => {
  // Check if there are more questions to skip
  if (currentQuestionIndex < questions.length - 1) {
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // Reset the selected option for the new question
    setSelectedOption(null);
    // Indicate that the next button is clicked (optional)
    setNextButtonClicked(true);
  }
}

  
  
  function getFormattedTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <>
    <style>
      {`body{
    position: relative;
width: 100%;
height: 768.38px;
overflow-x: hidden;


background: #FFFFFF;
}
.navigational{
    position: absolute;
width: 213.44px;
height: 768.38px;
left: 0px;
top: 0px;


background: linear-gradient(179.54deg, #AFE0F4 5.55%, #E1EEC8 194.36%);

}
.subnav{
    position: relative;
    bottom: 10px;
}

.list-of-topic{
   
    margin-top: 90px;
}
.list-of-topic ul li{
    padding: 15px;
    font-size: 15px;
    list-style-type: none;
    margin-top: 12px;
    font-family: 'Manrope';
font-style: normal;
font-weight: 400;

}


.logo1 img{
    position: relative;
    right: 27px;
}
.logoname{
    position: absolute;
    left: 53px;
}
.logout{
    position: absolute;
    left: 53px;
    top: 720px;
    font-family: 'Manrope';
font-style: normal;
font-weight: 400;
}
.logout img{
    position: relative;
    right: 85px;
    top: 0px;
}
.companylogo{
    position: absolute;
width: 33.44px;
height: 33.44px;
left: 35.57px;
top: 35.57px;


}
.companylogo img{
    position: relative;
    right: 13px;
}
.companyname{
    position: absolute;
left: 5%;
right: 28.08%;
top: 4.63%;
bottom: 92.38%;

font-family: 'Roboto';
font-style: normal;
font-weight: 600;
font-size: 19.9208px;
line-height: 23px;
letter-spacing: 0.1em;



color: #0C1116;

}
.companyname1{
    position: absolute;
left: 5%;
right: 28.08%;
top: 7.22%;
bottom: 90.96%;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 9.96042px;
line-height: 14px;


letter-spacing: 0.09em;


color: #373F47;

}
.test{
    position: absolute;
width: 760.55px;
height: 330.12px;
left: 241.9px;
top: 109.56px;

}
.top-bar{
    position: absolute;
width: 1152.56px;
height: 81.11px;
left: 213.44px;
top: 0px;

filter: drop-shadow(0px 0px 4.26875px rgba(0, 0, 0, 0.16));
}
.top-bar1{
    position: absolute;
width: 414px;
height: 37.9px;
left: 241.9px;
top: 22.06px;

}
.Allocated-Assessment{
    position: absolute;
width: 182px;
height: 23px;
left: 241.9px;
top: 22.06px;

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 17.075px;
line-height: 23px;



color: #242D35;
}
.viewcomplete{
    position: absolute;
width: 414px;
height: 13px;
left: 241.9px;
top: 46.96px;

font-family: 'Manrope';
font-style: normal;
font-weight: 400;
font-size: 9.24896px;
line-height: 13px;

color: #A8B0B9;
}
.search{
    position: absolute;
width: 274.62px;
height: 30px;
left: 845.21px;
top: 26.32px;
border: 1px solid black;
border-radius: 8px;
}
.search h6{
    position: relative;
    bottom: 23px;
    left: 40px;
    font-family: 'Manrope';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 13px;
color: #A8B0B9;
}
#search{
    position: relative;

    left: 10px;
}
#notification{
    position: relative;
      top: 25px;
    left: 920px;
}
.rounded-circle{
    position: relative;
    left: 930px;
    top: 18px;
}
.name{
    position: absolute;
width: 90px;
height: 17px;
left: 1219.39px;
    top: 31.49px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;



color: #242D35;
}
.timer{
    position: absolute;
width: 296.68px;
height: 213.44px;
left: 1027.35px;
top: 111.7px;

border: 0.71px solid #D6DADE;
border-radius: 7.11px;
}
.question-status{
    position: absolute;
width: 296.68px;
height: 261.11px;
left: 1027.35px;
top: 353.59px;

border: 0.71px solid #D6DADE;
border-radius: 7.11px;
}
.questionstatus{
    position: absolute;
width: 112px;
height: 19px;
left: 1048.69px;
top: 374.94px;

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 14.2292px;
line-height: 19px;



color: #0C1116;
}
#div1{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 35.88px;
height: 34.08px;
left: 1048.69px;
top: 415.49px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div2{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.88px;
height: 34.08px;
left: 1101.34px;
top: 415.49px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div3{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.88px;
height: 34.08px;
left: 1155.41px;
top: 415.49px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div4{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding:4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.88px;
height: 34.08px;
left: 1210.19px;
top: 415.49px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div5{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.88px;
height: 34.08px;
left: 1264.97px;
top: 415.49px;


background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;

}
#div6{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 35.57px;
height: 34.08px;
left: 1048.69px;
top: 467.43px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div7{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 36.88px;
height: 34.08px;
left: 1101.34px;
top: 467.43px;

background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div8{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding: 4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.88px;
height: 34.08px;
left: 1155.41px;
top: 467.43px;



background: #F8FDFF;

border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div9{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding:4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.88px;
height: 34.08px;
left: 1210.19px;
top: 467.43px;


background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div10{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding:4.5375px 12.9406px;
gap: 7.11px;

position: absolute;
width: 37.71px;
height: 34.08px;
left: 1264.97px;
top: 467.43px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;
}
#div11{
    box-sizing: border-box;



display: flex;
flex-direction: column;
align-items: flex-start;
padding:2.5375px 7.9406px;
gap: 7.11px;

position: absolute;
width: 35.57px;
height: 34.08px;
left: 1048.69px;
top: 519.36px;



background: #F8FDFF;


border: 0.711458px solid #AFE0F4;
border-radius: 2.84583px;

}
#start-btn{
    position: absolute;
width: 296.68px;
height: 39.84px;
left: 1027.35px;
top: 643.16px;



background: #DFF3FB;
border-radius: 2.84583px;
border: 1px solid black;

}

#next-btn{
    box-sizing: border-box;



display: flex;
flex-direction: row;
align-items: flex-start;
padding: 7.11458px 17.075px;
gap: 14.23px;

position: absolute;
width: 66.88px;
height: 34.15px;
left: 934.86px;
top: 463.16px;



background: #DFF3FB;


border: 0.711458px solid #7BCCED;
border-radius: 2.84583px;
}
#previous-btn{
   




display: flex;
flex-direction: row;
align-items: flex-start;
padding: 7.11458px 17.075px;
gap: 14.23px;

position: absolute;
width: 59.05px;
height: 34.15px;
left: 241.9px;
top: 463.16px;
border: none;



background: #FFFFFF;
border-radius: 2.84583px;
}
.indicator{
    position: absolute;
width: 217.33px;
height: 17px;
left: 1067.19px;
top: 575.57px;

}
.answered{
    position: absolute;
width: 78.5px;
height: 17px;
left: 1067.19px;
top: 575.57px;

}
.Answered{
    position: absolute;
width: 60px;
height: 17px;
left: 1085.69px;
top: 575.57px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;



color: #717D8A;

}
.notanswered{
    position: absolute;
width: 85px;
height: 17px;
left: 1199.52px;
top: 575.57px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;


color: #717D8A;

}
.dot{
    position: absolute;
width: 11.38px;
height: 11.38px;
left: 1067.19px;
top: 579.84px;



background: #1CAAE2;
}
.dot1{
    position: absolute;
width: 11.38px;
height: 11.38px;
left: 1181.02px;
top: 579.84px;



background: #DFF3FB;
}
.timer1{
    position: absolute;
width: 39px;
height: 19px;
left: 1048.69px;
top: 133.04px;

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 14.2292px;
line-height: 19px;



color: #0C1116;
}
.time{
    position: absolute;
width: 70px;
height: 39px;
left: 1140.47px;
top: 188.54px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 28.4583px;
line-height: 39px;


text-align: center;



color: #0C1116;

}
.estimate{
    position: absolute;
width: 127px;
height: 17px;
left: 1112.01px;
top: 286.72px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;
text-align: center;



color: #0C1116;
}
.points{
    position: absolute;
width: 60.47px;
height: 17.08px;
left: 941.26px;
top: 174.31px;

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 12.8062px;
line-height: 17px;


color: #717D8A;
}
.option1{
    position: absolute;
width: 759.84px;
height: 47.67px;
left: 242.61px;
top: 221.26px;

border: 0.71px solid #D6DADE;


}
#optionanswer{
    position: absolute;

left: 296.68px;
top: 235.49px;

font-family: 'Manrope';
font-style: normal;
font-weight: 400;
font-size: 12.8062px;
line-height: 17px;


color: #4F5B67;


}
#radio1{
    box-sizing: border-box;

position: absolute;
width: 17.08px;
height: 17.08px;
left: 263.95px;
top: 236.2px;



background: #FFFFFF;


border: 0.711458px solid #A8B0B9;
}
.option2{
    position: absolute;
width: 759.84px;
height: 47.67px;
left: 241.9px;
top: 278.18px;

border: 0.71px solid #D6DADE;


}
#option2answer{
    position: absolute;

left: 295.97px;
top: 293.12px;

font-family: 'Manrope';
font-style: normal;
font-weight: 400;
font-size: 12.8062px;
line-height: 17px;


color: #4F5B67;

}
#radio2{
    box-sizing: border-box;

position: absolute;
width: 17.08px;
height: 17.08px;
left: 263.24px;
top: 293.12px;


border: 0.711458px solid #A8B0B9;
}
.option3{
    position: absolute;
width: 759.84px;
height: 47.67px;
left: 241.9px;
top: 335.1px;

border: 0.71px solid #D6DADE;

}
#option3answer{
    position: absolute;

left: 295.97px;
top: 350.04px;

font-family: 'Manrope';
font-style: normal;
font-weight: 400;
font-size: 12.8062px;
line-height: 17px;


color: #4F5B67;

}
#radio3{
    box-sizing: border-box;

position: absolute;
width: 17.08px;
height: 17.08px;
left: 263.24px;
top: 350.04px;



background: #FFFFFF;


border: 0.711458px solid #A8B0B9;
}
.option4{
    position: absolute;
width: 759.84px;
height: 47.67px;
left: 241.9px;
top: 392.01px;

border: 0.71px solid #D6DADE;

}
#option4answer{
    position: absolute;

left: 295.97px;
top: 406.95px;

font-family: 'Manrope';
font-style: normal;
font-weight: 400;
font-size: 12.8062px;
line-height: 17px;





color: #4F5B67;
}
#radio4{
    
    box-sizing: border-box;

    position: absolute;
    width: 17.08px;
    height: 17.08px;
    left: 263.24px;
    top: 406.95px;
    
    
    background: #FFFFFF;
   
    
    border: 0.711458px solid #A8B0B9;
}
#question{
    position: absolute;

left: 241.9px;
top: 149.41px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;




color: #717D8A;
}
.level{
    position: absolute;
width: 38.42px;
height: 17.08px;
left: 359.29px;
top: 149.41px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;

color: #717D8A;

}
.basic{
    position: absolute;
width: 32.73px;
height: 17.08px;
left: 401.97px;
top: 149.41px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;


color: #717D8A;

}
.content{
    position: absolute;
width: 121.66px;
height: 18.5px;
left: 243.9px;
top: 109.56px;

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 14.2292px;
line-height: 19px;



color: #242D35;
}
.time-left{
    position: absolute;
width: 53px;
height: 17px;
left: 1149.01px;
top: 233.36px;

font-family: 'Manrope';
font-style: normal;
font-weight: 500;
font-size: 12.8062px;
line-height: 17px;
text-align: center;



color: #717D8A;
}
#question_no_one{
    position: absolute;
width: 347.9px;
height: 17.08px;
left: 242.9px;
top: 174.31px;

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 12.8062px;
line-height: 17px;

color: #242D35;
}

`}
    </style>
      <div className="navigational">
        <div className="list-of-topic">
          <ul>
            <li>
              <span className="logo1">
                <img src={dash} />
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
                <img src={allocated}/>
              </span>
              <span className="logoname">Allocated Assessment</span>
            </li>
            <li>
              <span className="logo1">
                <img src={result} />
              </span>
              <span className="logoname">Result</span>
            </li>
            <li>
              <span className="logo1">
                <img src={teammembers} />
              </span>
              <span className="logoname">Team Members</span>
            </li>
            <li>
              <span className="logo1">
                <img src={settings} />
              </span>
              <span className="logoname">Settings</span>
            </li>
            <li></li>
          </ul>
        </div>

        <div className="logout">
          Logout
          <img src={logout} alt="" />
        </div>
      </div>
      <div className="companylogo">
        <img src={kaninilogo} alt="" width="95%" height="95%" />
      </div>
      <div className="companyname">kanini</div>
      <div className="companyname1">assessment</div>
      <div className="test"></div>
      <div className="top-bar">
        <span className="material-symbols-outlined" id="notification">
          notifications
        </span>
        <img
          className="rounded-circle"
          // src={abraar}
          alt="Generic placeholder image"
          width="30"
          height="30"
        />
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
      {questions.map((question, index) => (
          <button
            key={`div${index}`}
            id={`div${index + 1}`}
            className={nextButtonClicked && currentQuestionIndex === index ? 'primary' : ''}
            onClick={() => handleQuestionButtonClick(index)}
          >
            {index + 1}
          </button>
        ))}

      <button id="start-btn">Submit Assessment</button>

      <button id="next-btn" onClick={handleNextQuestion}>
        Next
      </button>
      <button id="start-btn" onClick={submitAnswer}>
        Submit Assessment
      </button>
      <button id="previous-btn"onClick={handleSkipQuestion}>Skip</button>
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
      <div className="content"> {userDetails && userDetails.length > 0 && userDetails[0]}</div>
      <div className="time-left">Time left</div>
      <div id="question_no_one">{questions[currentQuestionIndex]?.qnInWords}</div>
    </>
  );
}
