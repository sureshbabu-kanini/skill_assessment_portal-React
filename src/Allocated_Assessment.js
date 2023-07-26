import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Allocated_Assessment.css';

export default function Allocated_Assessment() {
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

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const apiUrl = `https://localhost:7198/api/Users/GetByEmail?userEmail=${encodeURIComponent(userEmail)}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const user = response.data[0];
        setUserData({
          empId: user.user_ID,
          empName: `${user.user_FirstName} ${user.user_LastName}`,
          department: user.user_Departmenr,
          designation: user.user_Designation,
          level: user.user_Level,
          assessmentId: user.assessment_ID,
          requestedDate: user.assessment_Requested_Date,
          topics: user.assessment_SelectedTopic,
          timeAlloted: user.assessment_TimeDuration,
          assessmentDate: user.assessment_DateOfCompletion,
          assessmentPoints: user.assessment_Points,
        });

        const assessmentApiUrl = `https://localhost:7198/api/Assessments/max-assessment/${user.user_ID}`;
        axios
          .get(assessmentApiUrl)
          .then((assessmentResponse) => {
            const assessmentData = assessmentResponse.data;
            setUserData((prevUserData) => ({
              ...prevUserData,
              assessmentId: assessmentData.assessment_ID,
              requestedDate: assessmentData.assessment_Requested_Date,
              topics: assessmentData.assessment_SelectedTopic,
              timeAlloted: assessmentData.assessment_TimeDuration,
              assessmentDate: assessmentData.assessment_DateOfCompletion,
              assessmentPoints: assessmentData.assessment_Points,
              assessmentLevel:assessmentData.assessment_SelectedLevel
            }));
          })
          .catch((error) => {
            console.error('Error fetching assessment data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <div className="sidebar"></div>
      <div className="topbar"></div>
      <div className="Assignedtext">Assigned Assessment</div>
      <div className="assessmenttxt">Assessment Details</div>
      <div className="assessmentid">Assessment ID</div>
      <div className="assessmentidbox">
      <form>
          <input
            type="text"
            id="tb6"
            required
            value={userData.assessmentId}
            readOnly={!isEditMode}
          />
          <span id="errorText1"></span>
        </form>
      </div>
      <div class="requesteddate">Requested date</div>
      <div className="requestedbox">
        <form>
          <input
            type="text"
            id="tb7"
            required
            value={userData.requestedDate}
            readOnly={!isEditMode}
          />
          <span id="errorText2"></span>
        </form>
      </div>
      <div class  ="topics">Topics</div>
      <div className="topicsbox">
        <form>
          <input
            type="text"
            id="tb8"
            required
            value={userData.topics}
            readOnly={!isEditMode}
          />
          <span id="errorText3"></span>
        </form>
      </div>
      <div class="timealloted">Time Alloted</div>
      <div className="timeallotedbox">
        <form>
          <input
            type="text"
            id="tb9"
            required
            value={userData.timeAlloted}
            readOnly={!isEditMode}
          />
          <span id="errorText4"></span>
        </form>
      </div>
      <div class="assessmentdate">Assessment Date</div>
      <div className="assessmentdatebox">
        <form>
          <input
            type="text"
            id="tb10"
            required
            value={userData.assessmentDate}
            readOnly={!isEditMode}
          />
          <span id="errorText5"></span>
        </form>
      </div>
      <div class="assessmentpoints">Assessment Points</div>
      <div className="assessmentpointbox">
        <form>
          <input
            type="text"
            id="tb11"
            required
            value={userData.assessmentPoints}
            readOnly={!isEditMode}
          />
          <span id="errorText6"></span>
        </form>
      </div>
      <div class="assessmentlast">Assessment level</div>
      <div className="assessmentlastbox">
        <form>
          <input
            type="text"
            id="tb12"
            required
            value={userData.assessmentLevel}
            readOnly={!isEditMode}
          />
          <span id="errorText7"></span>
        </form>
      </div>

      <div className="assessment">Assessment</div>
      <div className="before">Before You Start</div>
      <div className="assess1">15 Multiple choice questions</div>
      <div className="assess2">1.5 Minutes per question</div>
      <div className="assess3">Score in top 50% to earn a badge</div>
      <div className="bfs1">You must complete this assessment in one session - make sure your internet is reliable</div>
      <div className="bfs2">You can retake this assessment once if you don't earn a badge</div>
      <div className="bfs3">We won't show your results to anyone without your permission</div>
      <div className="back">Back</div>
      <div className="btn">
        <button style={{ backgroundColor: '#7BCCED', borderColor: '#7BCCED' }}></button>
      </div>
      <div className="confirm">Confirm</div>
      <div className="icon1"><img src="images/icon1.svg" alt="" /></div>
      <div className="icon2"><img src="images/icon2.svg" alt="" /></div>
      <div className="icon3"><img src="images/icon3.svg" alt="" /></div>
      <div className="icon4"><img src="images/icon4.svg" alt="" /></div>
      <div className="icon5"><img src="images/icon5.svg" alt="" /></div>
      <div className="icon6"><img src="images/icon6.svg" alt="" /></div>
    </div>
  );
}
