import React, { useEffect, useState } from 'react';
import './TeamMembers.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function TeamMembers() {
  const { cardId } = useParams(); // Extract the userId from the URL
  const [userDetails, setUserDetails] = useState(null);
  const [assessmentTopics, setAssessmentTopics] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected index
  const [resultCount, setResultCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState('0');

  // Function to fetch user details based on user ID
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7198/api/Users/${cardId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAssessmentTopics = async () => {
    try {
      const response = await axios.get(`https://localhost:7198/api/Assessments/assessment-topics/user/${cardId}`);
      setAssessmentTopics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResultsByUserId = async (cardId, index) => {
    try {
      const response = await axios.get(`https://localhost:7198/api/Results/GetResultsByUserId/${cardId}`);
      setUserResults(response.data);
      console.log('User Results:', response.data);
      setSelectedIndex(index); // Update the selected index
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResultCountByUserId = async (cardId) => {
    try {
      const response = await axios.get(`https://localhost:7198/api/Results/GetResultCountByUserId/${cardId}`);
      setResultCount(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalPoints = async () => {
    try {
      const userID = localStorage.getItem('userID');
      if (!cardId) return;

      // Add random query parameter to avoid caching
      const randomQueryParam = Math.random().toString(36).substring(7);
      const response = await fetch(`https://localhost:7198/api/Results/GetTotalPointsByUserId/${cardId}?rnd=${randomQueryParam}`);
      const data = await response.json();
      if (data !== null && !isNaN(data)) {
        setTotalPoints(String(data));
      } else {
        setTotalPoints('0'); 
      }
    } catch (error) {
      console.error('Error fetching total points:', error);
      setTotalPoints('0'); 
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTotalPoints();
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    fetchUserDetails();
    fetchAssessmentTopics();
    fetchResultsByUserId(cardId, selectedIndex);
    fetchResultCountByUserId(cardId);
    // Fetch the initial data for the default selected index

    // Get the button that opens the modal
    const btn = document.getElementById('myBtn');
    const btn2 = document.getElementById('myBtn2');
    const btn3 = document.getElementById('myBtn3');

    // Get the modal element
    const modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];

    // When the user clicks the button, open the modal and fetch the corresponding results
    btn.addEventListener('click', function () {
      modal.style.display = 'block';
      fetchResultsByUserId(cardId, 0); // Display results for index 0
    });

    btn2.addEventListener('click', function () {
      modal.style.display = 'block';
      fetchResultsByUserId(cardId, 1); // Display results for index 1
    });

    btn3.addEventListener('click', function () {
      modal.style.display = 'block';
      fetchResultsByUserId(cardId, 2); // Display results for index 2
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }, [cardId, selectedIndex]);
  
  return (
    <>
      <div className="row">
        {/* Sidebar */}
        <div className="col-2" id="sidebar_nav"></div>

        {/* Main Content */}
        <div className="col-10" id="maincontent">
          <div className="heading-bar">
            <div className="col-6" id="name-half">
              <span id="name-medium">Team Members</span>
              <span id="name-small">Add question under the selected department and topics</span>
            </div>

            <div id="name-second-half">
              {/* Search Bar */}
              <div id="search-bar">
                <input type="text" className="icon" placeholder="Search here" id="s-txt" />
              </div>

              {/* Bell Icon */}
              <div id="bell-icon"></div>

              {/* Kannini Logo */}
              <div id="kannini-logo"></div>

              {/* Profile Name */}
              <div id="profile-name">
                <span>Subramaniyam</span>
              </div>
            </div>
          </div>

          {/* Profile Wrapper */}
          <div className="col-3" id="profile-wrapper">
            <div className="card">
              <div id="card-firsthalf">
                {/* Back Button */}
                <div id="bck-btn">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_back_ios
                  </span>{" "}
                  <span id="bck">Back</span>
                </div>

                {/* Profile Image */}
                <div id="image"></div>

                {/* Profile Description */}
                <div id="description-profile">
                  <span id="prf-name">{userDetails ? userDetails.user_ID : ''}-{userDetails ? userDetails.user_FirstName : ''} {userDetails ? userDetails.user_LastName : ''}</span>
                  <span id="status">{userDetails ? userDetails.user_Departmenr : ''}</span>
                  <span id="skill">Skill Level: {userDetails ? userDetails.skilllevel : ''}</span>
                  <span></span>
                </div>

                {/* Progress Bar */}
                <div className="progress">
                  <div className="progress_bar"></div>
                </div>

                {/* Points Box */}
                <div id="points-box" style={{ marginTop: "15px" }}>
                  <div id="info-1">
                    <span id="E-point" className="info">
                      Earned points
                    </span>
                    <span id="Epoint-value" className="info value" style={{ fontWeight: "bold" }}>
                    {totalPoints}
                    </span>
                  </div>
                  <div id="vertical-line"></div>
                  <div id="info-2">
                    <span id="badge" className="info">
                      Badges
                    </span>
                    <span id="badge-value" className="info value" style={{ fontWeight: "bold" }}>
                      3
                    </span>
                  </div>
                  <div id="vertical-line"></div>
                  <div id="info-3">
                    <span id="test" className="info">
                      Test Taken
                    </span>
                    <span id="test-value" className="info value" style={{ fontWeight: "bold" }}>
                      {resultCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-secondhalf">
                {/* Personal Details */}
                <div className="personal-details">
                  <div id="heading">
                    <span className="info">Contact Details</span>
                  </div>
                  <div className="personal-info">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="p-value"> {userDetails ? userDetails.user_Location : ''}</span>
                  </div>
                  <div className="personal-info">
                    <span className="material-symbols-outlined">smartphone</span>
                    <span className="p-value"> +91 {userDetails ? userDetails.user_PhoneNo : ''}</span>
                  </div>
                  <div className="personal-info">
                    <span className="material-symbols-outlined">mail</span>
                    <span className="p-value"> {userDetails ? userDetails.user_Email : ''}</span>
                  </div>
                </div>

                {/* Badge Wrapper */}
                <div className="badge-wrapper">
                  <span className="info" id="bd" style={{ fontSize: "medium" }}>
                    Badges
                  </span>
                  <div className="logo-wrapper" style={{ marginTop: "20px" }}>
                    <div className="logo"></div>
                    <div className="logo"></div>
                    <div className="logo"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Wrapper */}
          <div className="col-9" id="status-wrapper">
            {/* Text Wrapper */}
            <div id="text-wrapper" style={{ marginLeft: "8px" }}>
              <div
                id="text-1"
                
                style={{ paddingBottom: "2px", paddingLeft: "2px", paddingRight: "2px" }}
              >
                Completed Test
              </div>
              <div
                id="text-2"
               
                style={{ paddingBottom: "2px", paddingLeft: "2px", paddingRight: "2px" }}
              >
                Ongoing Test
              </div>
            </div>

            <div id="assessment-wrapper">
              {/* Skill Assessment */}
              
              
              <div className="skill-asst" style={{ marginBottom: "15px" }}>
                <div className="inside-text col-9">
                  <h5>User-Experience Skill Assessment</h5>
                  <p style={{ marginTop: "0px" }}>
                    <strong>Topics: {}</strong> 
                  </p>
                </div>
                <div className="button-view col-3">
                  <a className="button" id="myBtn">
                    View Results
                  </a>
                </div>

                <div className="create-wrapper">
                  <div className="create-content">
                    <span className="material-symbols-outlined">schedule</span>
                    Created on: 27th July 2022
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">person</span>
                    Created by: {userDetails ? userDetails.user_FirstName : ''}
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">schedule</span>
                    <span className="submitted-text">Submitted on:  {userResults[0]?.date}</span>
                  </div>
                  <div className="create-content bookmark">
                    <span className="material-symbols-outlined">bookmark</span>
                    Result: {userResults[0]?.passorfail}
                  </div>
                </div>

                <div id="empty-box"></div>
              </div>

             
              <div className="skill-asst" style={{ marginBottom: "15px" }}>
                <div className="inside-text col-9">
                  <h5>User-Experience Skill Assessment</h5>
                  <p style={{ marginTop: "0px" }}>
                    <strong>Topics: </strong>Information Architecture, Information Design, Interaction Design, Mobile
                    UX design, Patterns & Antipatterns, Portfolio Design
                  </p>
                </div>
                <div className="button-view col-3 " >
                  <a className="button" id='myBtn2' >View Results</a>
                </div>

                <div className="create-wrapper">
                  <div className="create-content">
                    <span className="material-symbols-outlined">schedule</span>
                    Created on: 27th July 2022
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">person</span>
                    Created by: {userDetails ? userDetails.user_FirstName : ''}
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">schedule</span>
                    <span className="submitted-text">Submitted on: {userResults[1]?.date}</span>
                  </div>
                  <div className="create-content bookmark">
                    <span className="material-symbols-outlined">bookmark</span>
                    Result:{userResults[1]?.passorfail}
                  </div>
                </div>

                <div id="empty-box"></div>
              </div>

            
              <div className="skill-asst" id="skill-asst-box">
                <div className="inside-text col-9">
                  <h5>User-Experience Skill Assessment</h5>
                  <p style={{ marginTop: "0px" }}>
                    <strong>Topics: </strong>Information Architecture, Information Design, Interaction Design, Mobile
                    UX design, Patterns & Antipatterns, Portfolio Design
                  </p>
                </div>
                <div className="button-view col-3">
                  <a className="button" id='myBtn3'>View Results</a>
                </div>

                <div className="create-wrapper">
                  <div className="create-content">
                    <span className="material-symbols-outlined">schedule</span>
                    Created on: 27th July 2022
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">person</span>
                    Created by: {userDetails ? userDetails.user_FirstName : ''}
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">schedule</span>
                    Submitted on:  {userResults[2]?.date}
                  </div>
                  <div className="create-content">
                    <span className="material-symbols-outlined">bookmark</span>
                    Result: {userResults[2]?.passorfail}
                  </div>
                </div>

                <div id="empty-box"></div>
              </div>
            
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>

          <div className="content-wrapper">
            <div id="box-head">
              <span>Assessment Result</span>
            </div>
          </div>

          <hr id="horizontal-line" />

          <div id="model-firsthalf-wrapper">
            <div id="upper-heading">
              <div className="col-6" style={{ paddingLeft: "25px" }}>
                <span className="material-symbols-outlined" style={{ color: "rgb(64,161,212)" }}>
                  badge
                </span>{" "}
                <span id="name-employe"> Employee Details</span>
                <span id="Deena">{userDetails ? userDetails.user_name : ''}</span>
              </div>
              <div id="ast-name">
                <span className="material-symbols-outlined" style={{ color: "rgb(64,161,212)" }}>
                  quiz
                </span>
                <span style={{ color: "rgb(64,161,212)" }}>Assessment Details</span>
                <div id="course-name">ASS021_UX_005</div>
              </div>
            </div>

            <div id="model-first-half">
              <div className="col-6" id="employee-info">
                <div className="details-left col-3" id="employee-firsthalf">
                  <span className="text-model">Emp Code</span>
                  <span className="text-model">Email Address </span>
                  <span className="text-model">Department</span>
                  <span className="text-model">Designation</span>
                </div>
                <div id="employee-secondhalf" className="col-6">
                  <span className="text-model-right">{userDetails ? userDetails.user_ID : ''}</span>
                  <span className="text-model-right">{userDetails ? userDetails.user_Email : ''}</span>
                  <span className="text-model-right">{userDetails ? userDetails.user_Departmenr : ''}</span>
                  <span className="text-model-right">{userDetails ? userDetails.user_Designation : ''}</span>
                </div>
              </div>
              <div className="astmt-dails col-6">
                <div id="Assessment-info">
                  <div id="employee-info-left" className="col-4">
                    <span className="text-left">Level</span>
                    <span className="text-left">No. of Topics</span>
                    <span className="text-left">No of Questions</span>
                    <span className="text-left">Creating on</span>
                  </div>
                  <div id="employee-info-right" className="col-5">
                    <span className="text-right">Basic</span>
                    <span className="text-right">3</span>
                    <span className="text-right">30</span>
                    <span className="text-right">21-07-2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="model-secondhalf-wrapper">
            <div className="performence-card">
              <div className="card-left">
                <span id="rst-top">Result</span>
                <div>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "rgb(82,184,138)", marginleft: "5px" }}>
                    priority
                  </span>
                  <span id="ast-passed">Assessment Passed</span>
                </div>
                <div className="text-card" style={{ marginTop: "5px" }}>
                  Correct Answer
                </div>
                <div className="textanswer">
                  <strong>{userResults[selectedIndex]?.answeredQuestions}</strong>/{userResults[selectedIndex]?.totalQuestions}
                </div>
                <div className="text-card">Wrong Answer</div>
                <div className="textanswer">
                  <strong>{userResults[selectedIndex]?.wrongAnsweredQuestions}</strong>/{userResults[selectedIndex]?.totalQuestions}
                </div>
                <div className="text-card">Skipped Answer</div>
                <div className="textanswer">
                  <strong>{userResults[selectedIndex]?.unansweredQuestions}</strong>/{userResults[selectedIndex]?.totalQuestions}
                </div>
                <div className="circle-wrap">
                  <div className="circle">
                    <div className="mask full">
                      <div className="fill"></div>
                    </div>
                    <div className="mask half">
                      <div className="fill"></div>
                    </div>
                    <div className="inside-circle">
                      <span id="point-head">85</span>
                      <span style={{ fontSize: "medium" }}>%</span>
                      <span id="point">60 points</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timer-card" style={{ marginLeft: "45px" }}>
                <span className="tme">Timer</span>
                <div id="timer-bomma">
                  <span className="material-symbols-outlined" style={{ marginRight: "10px", marginLeft: "10px", color: "#2e95d1" }}>
                    timer
                  </span>{" "}
                  <span style={{ color: "#2e95d1" }}>Total Time</span>
                </div>
                <span id="timings">00:00:12</span> <span>/</span>{" "}
                <span style={{ margin: "10px" }}>{userResults[selectedIndex]?.timeLeft}</span>
                <div className="progress-container">
                  <div className="inner-fill">
                    <span id="round"></span>
                  </div>
                </div>
                <table width="87%" style={{ marginLeft: "46px" }}>
                  <tr>
                    <td className="table-left">Start time</td>
                    <td className="table-right">{userResults[selectedIndex]?.starttime.split(',')[1].trim()}</td>
                    <td className="table-left">Question</td>
                    <td className="table-right">01</td>
                  </tr>
                  <tr>
                    <td className="table-left">End Time</td>
                    <td className="table-right">{userResults[selectedIndex]?.endtime.split(',')[1].trim()}</td>
                    <td className="table-left">Completion on</td>
                    <td className="table-right">26-07-2022</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}