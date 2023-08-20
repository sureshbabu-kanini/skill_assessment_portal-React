import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Allocated_Assessment_Detail.css';
import { useNavigate } from 'react-router-dom';

export default function Allocated_Assessment_Detail() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    empId: '',
    empName: '',
    department: '',
    designation: '',
    level: '',
    assessmentId: '',
    requestedDate: '',
    topics: '',
    timeAlloted: '',
    assessmentDate: '',
    assessmentPoints: '',
  });

  const [assessmentData1, setAssessmentData1] = useState({
    assessment_Departmenr: "abc",
    assessment_DateOfCompletion: "",
    assessment_ID: 0,
    assessment_NoOfQuestions: 0,
    assessment_Points: 0,
    assessment_Requested_Date: "",
    assessment_SelectedLevel: "",
    assessment_SelectedTopic: "",
    assessment_TimeDuration: ""
  });

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const apiUrl = `https://localhost:7198/api/Users/GetByEmail?userEmail=${encodeURIComponent(userEmail)}`;
    axios
      .get(apiUrl)
      .then(response => {
        const user = response.data[0];
        setUserData({
          empId: user.user_ID,
          empName: `${user.user_FirstName} ${user.user_LastName}`,
          department: user.user_Departmenr,
          designation: user.user_Designation,
          level: user.user_Level,
          assessmentId: user.assessment_ID,
        });

        const assessmentApiUrl = `https://localhost:7198/api/Assessments/max-assessment/${user.user_ID}`;
        axios
          .get(assessmentApiUrl)
          .then(assessmentResponse => {
            const assessmentData = assessmentResponse.data;
            const fetchedAssessmentId = assessmentData.assessment_ID;
            localStorage.setItem('assessmentId', fetchedAssessmentId);
            setUserData(prevUserData => ({
              ...prevUserData,
              assessmentId: fetchedAssessmentId,
            }));

            // Print the assessment data in the console
            console.log('Assessment Data:', assessmentData);
            setAssessmentData1(assessmentData);

          })
          .catch(error => {
            console.error('Error fetching assessment data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Allocated');
  };

  const handleBackClick = () => {
    navigate('/Alloted');
  };

    
  return (
    <div>
      <div className="sidebar"></div>
      <div className="topbar"></div>
      <div className="empdeet">Employee Details</div>
      <div className="empidtxt">Emp Id</div>
      <div className="empidbox">
      <form>
      <input
            type="text"
            id="tb1"
            required
            value={userData.empId}
            onChange={(e) => setUserData({ ...userData, empId: e.target.value })}
            readOnly={!isEditMode}
          />
          <span id="errorText"></span>

      </form>
      </div>
      <div className="empnametxt">Emp Name</div>
      <div className="empnamebox">
        <form>
        <input
            type="text"
            id="tb2"
            required
            value={userData.empName}
            onChange={(e) => setUserData({ ...userData, empName: e.target.value })}
            readOnly={!isEditMode}
          />
          <span id="errorText"></span>
        </form>
      </div>
      <div className="department">Department</div>
      <div className="departmentbox">
      <input
            type="text"
            id="tb3"
            required
            value={userData.department}
            onChange={(e) => setUserData({ ...userData, department: e.target.value })}
            readOnly={!isEditMode}
          />
          <span id="errorText"></span>
      </div>
      <div className="designation">Designation</div>
      <div className="designationbox">
        <form>
        <input
            type="text"
            id="tb4"
            required
            value={userData.designation}
            onChange={(e) => setUserData({ ...userData, designation: e.target.value })}
            readOnly={!isEditMode}
          />
          <span id="errorText"></span>
        </form>
      </div>
      <div className="level1">Level</div>
      <div className="levelbox">
        <form>
          <input type="text" id="tb5" value={assessmentData1.assessment_SelectedLevel} />
          <span id="errorText"></span>
        </form>
      </div>
      <div className="assessmenttxt">Assessment Details</div>
      <div className="assessmentid">Assessment ID</div>
      <div className="assessmentidbox">
        <form>
        <input
            type="text"
            id="tb6"
            value={assessmentData1.assessment_ID}
            readOnly={!isEditMode}
          />
          <span id="errorText"></span>
        </form>
      </div>
      <div className="requesteddate">Requested date</div>
      <div className="requestedbox">
        <form>
          <input type="text" id="tb7" value={assessmentData1.assessment_Requested_Date}/>
          <span id="errorText"></span>
        </form>
      </div>
      <div className="topics">Topics</div>
      <div className="topicsbox">
        <form>
          <input type="text" id="tb8" value={assessmentData1.assessment_SelectedTopic}/>
          <span id="errorText"></span>
        </form>
      </div>
      <div className="timealloted">Time Alloted</div>
      <div className="timeallotedbox">
        <form>
          <input type="text" id="tb9" value={assessmentData1.assessment_TimeDuration} />
          <span id="errorText"></span>
        </form>
      </div>
      <div className="assessmentdate">Assessment Date</div>
      <div className="assessmentdatebox">
        <input type="text" id="tb10" value={assessmentData1.assessment_DateOfCompletion} />
        <span id="errorText"></span>
      </div>
      <div className="assessmentpoints">Assessment Points</div>
      <div className="assessmentpointbox">
        <form>
          <input type="text" id="tb11" value={assessmentData1.assessment_Points} />
          <span id="errorText"></span>
        </form>
      </div>
      <div className="assessment">Assessment</div>
      <div className="before">Before You Start</div>
      <div className="assess1">15 Multiple choice questions</div>
      <div className="assess2">1.5 Minutes per questions</div>
      <div className="assess3">Score in top 50% to earn a badge</div>
      <div className="bfs1">You must complete this assessment in one session - make sure your internet is reliable</div>
      <div className="bfs2">You can retake this assessment once if you don't earn a badge</div>
      <div className="bfs3">We won't show your results to anyone without your permission</div>

      <div className="back" onClick={handleBackClick}>Back</div>
      <div className="btn">
        <button style={{ backgroundColor: '#7BCCED', borderColor: '#7BCCED' }}></button>
      </div>
      <div className="confirm" onClick={handleClick}>Confirm</div>
      <div className="icon1">
        <img src="assets/Allocated_" alt="" />
      </div>
      <div className="icon2">
        <img src="images/icon2.svg" alt="" />
      </div>
      <div className="icon3">
        <img src="images/icon3.svg" alt="" />
      </div>
      <div className="icon4">
        <img src="images/icon4.svg" alt="" />
      </div>
      <div className="icon5">
        <img src="images/icon5.svg" alt="" />
      </div>
      <div className="icon6">
        <img src="images/icon6.svg" alt="" />
      </div>
    </div>
  );
}
