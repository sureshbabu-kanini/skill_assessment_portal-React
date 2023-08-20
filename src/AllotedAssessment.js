import React, { useState, useEffect, useMemo } from 'react';
import './AllotedAssessment.css';
import axios from 'axios';
import SearchLogo from './assets/AllotedAssessment/SearchLogo.svg';
import BasicLogo from './assets/AllotedAssessment/Basiclogo.svg';
import UpskillLogo from './assets/AllotedAssessment/UpskillLogo.svg';
import das from './assets/TeamMembersCard/das.svg';
import takeass from './assets/TeamMembersCard/takeass.svg';
import kaninilogo from './assets/TeamMembersCard/kaninilogo.svg';
import allocateass from './assets/TeamMembersCard/allocateass.svg';
import result from './assets/TeamMembersCard/result.svg';
import team1 from './assets/TeamMembersCard/teammem.svg';
import setting from './assets/TeamMembersCard/setting.svg';
import logout from './assets/TeamMembersCard/logout.svg';
import { Link, useNavigate } from 'react-router-dom';

const AllotedAssessment = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [duration, setDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('https://localhost:7198/api/Topics');
        setTopics(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle error
      }
    };
    fetchTopics();
  }, []);

  const handleCourseSelection = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      if (selectedCourses.length < 3) {
        setSelectedCourses((prevCourses) => [...prevCourses, name]);

        // Extract and store the selected course's ID
        const selectedTopic = topics.find(topic => topic.topic_Name === name);
        if (selectedTopic) {
          localStorage.setItem('randomCourseID', selectedTopic.topic_Id);
        }
      }
    } else {
      setSelectedCourses((prevCourses) =>
        prevCourses.filter((course) => course !== name)
      );

      // Remove the course's ID from local storage when course is deselected
      const selectedTopic = topics.find(topic => topic.topic_Name === name);
      if (selectedTopic) {

      }
    }
  };

  const isCourseDisabled = (name) => {
    return selectedCourses.length === 3 && !selectedCourses.includes(name);
  };

  const handleLevelSelection = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleNumOfQuestionsChange = (event) => {
    setNumOfQuestions(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const navigate = useNavigate();

  const handleNextClick = async () => {
    try {
      const userID = localStorage.getItem('userID');
      const topic_Id = localStorage.getItem('randomCourseID')

      const assessmentData = {
        assessment_SelectedTopic: selectedCourses.join(', '),
        assessment_SelectedLevel: selectedLevel,
        assessment_TimeDuration: duration,
        assessment_Requested_Date: new Date().toISOString(),
        assesment_Departmenr: document.getElementById('departmentAlloted').value,
        assessment_NoOfQuestions: numOfQuestions,
        Users: { user_ID: userID },
        topics: {topic_Id: topic_Id}
      };
      await axios.post('https://localhost:7198/api/Assessments', assessmentData, {
        timeout: 5000,
      });
    } catch (error) {
      navigate("/AllocatedAssessment");
    }
  };

  const filteredCourses = useMemo(() => {
    return topics
      .filter(topic => topic.topic_Name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(topic => topic.topic_Name);
  }, [searchQuery, topics]);

  const getButtonClassName = (path) => {
    return window.location.pathname === path ? 'activeButton' : 'inactiveButton';
  };


  return (
    <>
      <style>
        {`.body {
    background: #1E1E1E;
}

.SidebarNew {
    position: absolute;
    width: 280px;
    height: 1080px;
    left: 0px;
    top: 0px;
    background: linear-gradient(179.54deg, #9cd8ef 5.55%, #96d9f4 194.36%);
  }
.kaninilogoNew { 
    width:93px;
    height:47px;
    position:absolute;
    left:123px;
    top:50px;
}
.kaninilogo1New { 
    color:rgba(12.000000234693289, 17.00000088661909, 22.000000588595867, 1);
    width:93px;
    height:33px;
    position:absolute;
    left:3px;
    top:0px;
    font-family:Roboto;
    text-align:left;
    font-size:28px;
    letter-spacing:10;
}
.kaninilogo2New { 
    color:rgba(55.17031118273735, 63.178905844688416, 71.18750050663948, 1);
    width:93px;
    height:19px;
    position:absolute;
    left:3px;
    top:28px;
    font-family:Manrope;
    text-align:left;
    font-size:14px;
    letter-spacing:9;
}
.kaninilogo3New { 
    width:47px;
    height:47px;
    position:absolute;
    left:55px;
    top:50px;
    background-repeat:no-repeat;
    background-size:cover;
}
.dashboardNew { 
    position:absolute;
    left:100px;
    top:155px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.dashboard1New { 
    position:absolute;
    left:55px;
    top:154px;
    right:237px;
    bottom:905px;
}
.TakeassNew { 
    position:absolute;
    left:100px;
    top: 220px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.Takeass1New { 
    position:absolute;
    left:55px;
    top:220px;
    right:237px;
    bottom:824.39px;
}
.AllocateassNew { 
    position:absolute;
    left:100px;
    top: 290px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.Allocateass1New { 
    position:absolute;
    left:55px;
    top:290px;
    right:240px;
    bottom:741px;
}
.ResultNew { 
    position:absolute;
    left:100px;
    top: 424px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.Result1New { 
    position:absolute;
    left:55px;
    top:424px;
    right:240px;
    bottom: 656px;
}
.teammemNew{
    position:absolute;
    left:100px;
    top: 360px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;

}
.Team1New{
    position:absolute;
    left:55px;
    top:360px;
    right: 235px;
    bottom: 574.95px;

}
.SettingsNew{
    position:absolute;
    left:100px;
    top: 480px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;

}
.Settings1New{
    position:absolute;
    left:55px;
    top:480px;
    right: 237px;
    bottom: 491.38px;

}
.LogoutNew{
    position:absolute;
    left:100px;
    top: 991px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;

}
.Logout1New{
    position:absolute;
    left:55px;
    top:991px;
    right: 242.55px;
    bottom: 69px;

}

.rectangleNew {
   /* Kanini Logo_H1 1 */

position: absolute;
width: 980px;
height: 420px;
left:-730px;
top: 720px;

background: url(assets/TeamMembersCard/bg.svg);
opacity: 1.06;

  }`}
      </style>
      <div>
        <div className="SidebarNew">
          <div className="kaninilogo">
            <span className="kaninilogo1New">Kanini</span>
            <span className="kaninilogo2New">Assessment</span>
          </div>
          <div className="kaninilogo3New">
            <img src={kaninilogo} alt="" />
          </div>
          <div>
            <Link to="/Dashboard" className={getButtonClassName('/dashboard')}>
              <span className="dashboardNew">Dashboard</span>
              <div className="dashboard1New">
                <img src={das} alt="" />
              </div>
            </Link>
            <Link to="/take-assessment" className={getButtonClassName('/take-assessment')}>
              <span className="TakeassNew">Take Assessment</span>
              <div className="Takeass1New">
                <img src={takeass} alt="" />
              </div>
            </Link>
            <Link to="/AllocatedAssessment" className={getButtonClassName('/allocated-assessment')}>
              <span className="AllocateassNew">Allocated Assessment</span>
              <div className="Allocateass1New">
                <img src={allocateass} alt="" />
              </div>
            </Link>
            <Link to="/result" className={getButtonClassName('/result')}>
              <span className="ResultNew">Result</span>
              <div className="Result1New">
                <img src={result} alt="" />
              </div>
            </Link>
            <Link to="/TeamMembersCard" className={getButtonClassName('/team-members')}>
              <span className="teammemNew">Team Members</span>
              <div className="Team1New">
                <img src={team1} alt="" />
              </div>
            </Link>
            <Link to="/Settings" className={getButtonClassName('/settings')}>
              <span className="SettingsNew">Settings</span>
              <div className="Settings1New">
                <img src={setting} alt="" />
              </div>
            </Link>
            <Link to="/logout" className={getButtonClassName('/logout')}>
              <span className="LogoutNew">Logout</span>
              <div className="Logout1New">
                <img src={logout} alt="" />
              </div>
            </Link>
            <div className="rectangleNew"></div>
          </div>
        </div>
        <div className="topbar-alloted"></div>
        <div className="searchhere-alloted">
          <input
            className="searchtopic-alloted"
            type="textAlloted"
            placeholder="Search topics here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img id="searchlogo-alloted" src={SearchLogo} alt="search" />
        </div>
        <div className="courselist-alloted">
          {filteredCourses.map((course) => (
            <label key={course}>
              <input
                type="checkbox"
                name={course}
                onChange={handleCourseSelection}
                disabled={isCourseDisabled(course)}
                checked={selectedCourses.includes(course)}
              />
              {course} <br /><br />
            </label>
          ))}
        </div>
        <div className="assessmentdeet-alloted">
          <div className="department-alloted">
            <select id="departmentAlloted">
              <option value="department1">Department 1</option>
              <option value="department2">Department 2</option>
              <option value="department3">Department 3</option>
            </select>
          </div>
          <div className="description-alloted">
            <fieldset id="description-alloted">
              <legend>Description</legend>
              {selectedCourses.map((course) => (
                <p key={course}>{course}</p>
              ))}
            </fieldset>
          </div>

          <div className="selectlevel-alloted">Select Levels</div>
          <div className="assessmenttxt-alloted">Assessment Details</div>
          <div className="lvl-alloted">
            <div>
              <select className="numofquestion-alloted" value={numOfQuestions} onChange={handleNumOfQuestionsChange}>
                <option value="" disabled>
                  No of Questions
                </option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div >
              <select className="duration-alloted" value={duration} onChange={handleDurationChange}>
                <option value="" disabled>
                  Duration
                </option>
                <option value="10 Minutes">10 Minutes</option>
                <option value="15 Minutes">15 Minutes</option>
                <option value="20 Minutes">20 Minutes</option>
              </select>
            </div>
            <div className="timecompletion-alloted">
              <input type="date" id="date-alloted" />
            </div>
          </div>
          <div className="level-options-container">
            <label className="level-option">
              <input
                type="radio"
                id="radio1-alloted"
                name="level"
                value="Basic"
                checked={selectedLevel === 'Basic'}
                onChange={handleLevelSelection}
                disabled={selectedLevel !== '' && selectedLevel !== 'Basic'}
              />
              <img className="logo1-alloted" src={BasicLogo} alt="Basic Level" />
              <span className="basic-alloted">Basic</span>
            </label>
            <label className="level-option">
              <input
                type="radio"
                id="radio2-alloted"
                name="level"
                value="Intermediate"
                checked={selectedLevel === 'Intermediate'}
                onChange={handleLevelSelection}
                disabled={selectedLevel !== '' && selectedLevel !== 'Intermediate'}
              />
              <img className="logo2-alloted" src={BasicLogo} alt="Intermediate Level" />
              <span className="intermediate-alloted">Intermediate</span>
            </label>
            <label className="level-option">
              <input
                type="radio"
                id="radio3-alloted"
                name="level"
                value="Advanced"
                checked={selectedLevel === 'Advanced'}
                onChange={handleLevelSelection}
                disabled={selectedLevel !== '' && selectedLevel !== 'Advanced'}
              />
              <img className="logo3-alloted" src={BasicLogo} alt="Advanced Level" />
              <span className="advanced-alloted">Advanced</span>
            </label>
            <label className="level-option">
              <input
                type="radio"
                id="radio4-alloted"
                name="level"
                value="Upskill"
                checked={selectedLevel === 'Upskill'}
                onChange={handleLevelSelection}
                disabled={selectedLevel !== '' && selectedLevel !== 'Upskill'}
              />
              <img className="logo4-alloted" src={UpskillLogo} alt="Upskill Level" />
              <span className="upskill-alloted">Upskill</span>
            </label>
          </div>
        </div>
        <div className="nextbtn-alloted" onClick={handleNextClick}>
          Next
        </div>
      </div>
    </>
  );
};

export default AllotedAssessment;