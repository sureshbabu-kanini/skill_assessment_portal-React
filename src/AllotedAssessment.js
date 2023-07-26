import React, { useState, useMemo } from 'react';
import './AllotedAssessment.css';
import axios from 'axios';
import SearchLogo from './assets/AllotedAssessment/SearchLogo.svg';
import DropdownDept from './assets/AllotedAssessment/DropdownDept.svg';
import BasicLogo from './assets/AllotedAssessment/Basiclogo.svg';
import UpskillLogo from './assets/AllotedAssessment/UpskillLogo.svg';

const AllotedAssessment = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [duration, setDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const user_ID = 1; 
  localStorage.setItem('user_ID',user_ID.toString());

  const courses = [
    "Azure SQL DB",
    "Applied Mathematics and Statistics",
    "Agile Methodologies and enterprise resource planning and implementation",
    "Application server software as well as backup and archival software",
    " C/C++",
    "Data visualisation, data migration and data mining",
    "DBMS including SQL Server",
    "Data mining and modeling tools",
    "Data management and reporting technologies, predictive analytics, and unstructured data",
    "Hadoop Technologies",
    "Information management and data processing on multiple platforms",
    "Java",
    "Machine learning, predictive modeling, and natural language processing"
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  const handleCourseSelection = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      if (selectedCourses.length < 3) {
        setSelectedCourses((prevCourses) => [...prevCourses, name]);
      }
    } else {
      setSelectedCourses((prevCourses) =>
        prevCourses.filter((course) => course !== name)
      );
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

  const handleNextClick = async () => {
    try {
      const userID = localStorage.getItem('user_ID');
    
      const assessmentData = {
        assessment_SelectedTopic: selectedCourses.join(', '), 
        assessment_SelectedLevel: selectedLevel,
        assessment_TimeDuration: duration, 
        assessment_Requested_Date: new Date().toISOString(),
        assesment_Departmenr: document.getElementById('departmentAlloted').value, 
        assessment_NoOfQuestions: numOfQuestions,
        Users: { user_ID: userID },       
      };
      await axios.post('https://localhost:7198/api/Assessments', assessmentData, {
      timeout: 5000, 
      });
    } catch (error) {
    }
  };

  return (
    <div>
      <div className="sidebarAlloted"></div>
      <div className="topbarAlloted"></div>
      <div className="searchhereAlloted">
        <input
          className="searchtopicAlloted"
          type="textAlloted"
          placeholder="Search topics here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img id="searchlogoAlloted" src={SearchLogo} alt="search" />
      </div>
      <div className="courselistAlloted">
        {filteredCourses.map((course) => (
          <label key={course}>
            <input
              type="checkbox"
              name={course}
              onChange={handleCourseSelection}
              disabled={isCourseDisabled(course)}
              checked={selectedCourses.includes(course)}
            />
            {course} <br/><br/>
          </label>
        ))}
      </div>
        <div className="assessmentdeetAlloted">
        <div className="deptAlloted">
          <span className="fordeptAlloted">
            <legend></legend>
          </span>
        </div>
        <div className="departmentAlloted">
          <select id="departmentAlloted">
            <option value="department1">Department 1</option>
            <option value="department2">Department 2</option>
            <option value="department3">Department 3</option>
          </select>
          <img id="dropdowndeptAlloted" src={DropdownDept} alt="dropdowndept" />
        </div>
        <div className="descriptionAlloted">
          <fieldset id="descriptionAlloted">
            <legend>Description</legend>
            {selectedCourses.map((course) => (
              <p key={course}>{course}</p>
            ))}
          </fieldset>
        </div>
        <div className="selectlevelAlloted">Select Levels</div>
        <div className="assessmenttxtAlloted">Assessment Details</div>
        <div className="lvlAlloted">
        <div>
          <select  className="numofquestionAlloted"  value={numOfQuestions} onChange={handleNumOfQuestionsChange}>
            <option value="" disabled>
              No of Questions
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div >
          <select className="durationAlloted" value={duration} onChange={handleDurationChange}>
            <option value="" disabled>
              Duration
            </option>
            <option value="10 Minutes">10 Minutes</option>
            <option value="15 Minutes">15 Minutes</option>
            <option value="20 Minutes">20 Minutes</option>
          </select>
        </div>
        <div className="timecompletionAlloted">
          <input type="date" id="dateAlloted" />
        </div>
      </div>
        <div className="level-options-container">
          <label className="level-option">
            <input
              type="radio"
              id="radio1Alloted"
              name="level"
              value="Basic"
              checked={selectedLevel === 'Basic'}
              onChange={handleLevelSelection}
              disabled={selectedLevel !== '' && selectedLevel !== 'Basic'}
            />
            <img className="logo1Alloted" src={BasicLogo} alt="Basic Level" />
            <span className="basicAlloted">Basic</span>
          </label>
          <label className="level-option">
            <input
              type="radio"
              id="radio2Alloted"
              name="level"
              value="Intermediate"
              checked={selectedLevel === 'Intermediate'}
              onChange={handleLevelSelection}
              disabled={selectedLevel !== '' && selectedLevel !== 'Intermediate'}
            />
            <img className="logo2Alloted" src={BasicLogo} alt="Intermediate Level" />
            <span className="intermediateAlloted">Intermediate</span>
          </label>
          <label className="level-option">
            <input
              type="radio"
              id="radio3Alloted"
              name="level"
              value="Advanced"
              checked={selectedLevel === 'Advanced'}
              onChange={handleLevelSelection}
              disabled={selectedLevel !== '' && selectedLevel !== 'Advanced'}
            />
            <img className="logo3Alloted" src={BasicLogo} alt="Advanced Level" />
            <span className="advancedAlloted">Advanced</span>
          </label>
          <label className="level-option">
            <input
              type="radio"
              id="radio4Alloted"
              name="level"
              value="Upskill"
              checked={selectedLevel === 'Upskill'}
              onChange={handleLevelSelection}
              disabled={selectedLevel !== '' && selectedLevel !== 'Upskill'}
            />
            <img className="logo4Alloted" src={UpskillLogo} alt="Upskill Level" />
            <span className="upskillAlloted">Upskill</span>
          </label>
        </div>
      </div>
      <div className="nextbtnAlloted" onClick={handleNextClick}>
        Next
      </div>
    </div>
  );
};

export default AllotedAssessment;