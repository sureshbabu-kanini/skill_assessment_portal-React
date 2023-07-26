import './EmployeeDashboard.css';
import React, { useEffect, useState } from 'react';
import AssessmentsBulb from './assets/EmployeeDashboardImages/Bulb.png';

export default function EmployeeDashboard() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userImageURL, setUserImageURL] = useState('');
  const [swaggerData, setSwaggerData] = useState([]);
  const [totalPoints, setTotalPoints] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetByEmail?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        console.log(data);
        setProfileData(data);
        if (data && data[0] && data[0].user_Image) {
          const binaryData = atob(data[0].user_Image);
          const blob = new Blob([new Uint8Array([...binaryData].map((char) => char.charCodeAt(0)))]);
          const imageURL = URL.createObjectURL(blob);
          setUserImageURL(imageURL);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();

    const fetchData1 = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetByEmailID?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        if (data && data.id) {
          localStorage.setItem('id', data.id);
        }
      } catch (error) {
        console.error('Error fetching data from the second API:', error);
      }
    };

    fetchData1();

    const fetchSwaggerData = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetUnmatchedUserByEmail?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        setSwaggerData(data);
      } catch (error) {
        console.error('Error fetching Swagger data:', error);
      }
    };

    fetchSwaggerData();
  }, []);

  useEffect(() => {
    if (profileData && profileData[0] && profileData[0].user_ID) {
      const userID = profileData[0].user_ID;
      localStorage.setItem('userID', userID);
    }

    setLoading(false);
  }, [profileData]);

  const fetchTotalPoints = async () => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) return; // Make sure userID is available before making the API call

      const response = await fetch(`https://localhost:7198/api/Results/GetTotalPointsByUserId/${userID}`);
      const data = await response.json();
      if (data && data) {
        setTotalPoints(String(data));
      }
    } catch (error) {
      console.error('Error fetching total points:', error);
    }
  };

  useEffect(() => {
    fetchTotalPoints();
  }, []);

  return (
    <div>
      <div className='fullbody'>
        <div className="Overview"></div>
        <div className="OverviewTitle">Overview</div>

        <div className="OngoingAssessed"></div>
        <div className="OngoingAssessedSVG">
        </div>
        <div className="OngoingAssessedText">Ongoing Assessed</div>
        <div className="NumberOfOngoingAssessed">3</div>

        <div className="CompletedAssessed"></div>
        <div className="CompletedAssessedSVG">
        </div>
        <div className="CompletedAssessedText">Completed Assessed</div>
        <div className="NumberOfCompletedAssessed">6</div>

        <div className="PointsEarned"></div>
        <div className="PointsEarnedSVG">
        </div>
        <div className="PointsEarnedText">Points Earned</div>
        <div className="NumberOfPointsEarned">{totalPoints}</div>

        <div className="BadgesEarnedTitle">Badge Earned</div>
        <div className="BadgesEarned"></div>
        <div className="Reward1"></div>
        <div className="Reward2"></div>
        <div className="Reward3"></div>

        <div className="SkillLevel">Skill Level:</div>
        <div className="SkillLevelBasic">
          <b>Basic</b>
        </div>
        <div className="SkillLevelBar"></div>

        <div className="QuickAccess">Quick Access</div>
        <div className="QuickaccessAssessment">
          <div className="Assessments">
            Assessments
            <div className="NumberOfAssessment">2 new assessment received</div>
          </div>
          <div className="NumberOfAssessmentArrow">
          </div>
        </div>
        <div className="AssessmentsLogoEllipse">
          <div className="AssessmentsLogoEllipseVector" style={{ backgroundImage: `url(${AssessmentsBulb})` }}></div>

        </div>

        <div className="QuickaccessAssessmentResult">
          <div className="AssessmentsResultLogoEllipse">
            <div className="AssessmentsResultLogoEllipseVector">
            </div>
          </div>
          <div className="AssessmentsResultLogoEllipseArrow">
            <img src="assets/EmployeeDashboardImages/AssessmentArrow.svg" alt="" />
          </div>
          <div className="AssessmentResultQuickAccess">Assessment Result</div>
          <div className="NumberOfAssessmentResult">3 new results have been generated</div>
        </div>

        <div className="ReportingManagerTitle">Reporting Manager</div>
        <div className="ReportingManagerProfile">
          {swaggerData.length >= 6 && (
            <>
              <div className="ReportingManagerProfilePicture">
                <img src="assets/EmployeeDashboardImages/ReportingManagerPic.svg" alt="" />
              </div>
              <div className="ReportingManagerName">{`${swaggerData[5].user_FirstName} ${swaggerData[5].user_LastName}`}</div>
              <div className="ReportingManagerRole">{`${swaggerData[5].user_ID} - ${swaggerData[5].user_Designation}`}</div>
            </>
          )}
        </div>

        <div className="YourHRspocTitle">Your HR-spoc</div>
        <div className="YourHRspocProfile">
          {swaggerData.length >= 6 && (
            <>
              <div className="YourHRspocProfilePicture"></div>
              <div className="YourHRspocName">{`${swaggerData[4].user_FirstName} ${swaggerData[4].user_LastName}`}</div>
              <div className="YourHRspocRole">{`${swaggerData[4].user_ID} - ${swaggerData[4].user_Designation}`}</div>
            </>
          )}
        </div>

        <div className="Colleague">
          <div className="ColleagueTitle">Colleague</div>
          <div className="ViewAllColleague">View All</div>
          <div className="ColleagueMembers">
            {swaggerData.length >= 4 && (
              <>
                <div className="ColleagueMembers1">
                  <div className="ColleagueMembers1ID">{`${swaggerData[0].user_ID} - ${swaggerData[0].user_FirstName} ${swaggerData[0].user_LastName}`}</div>
                  <div className="ColleagueMembers1Points">Points: 1587</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[0].user_Designation} | ${swaggerData[0].user_Departmenr} | ${swaggerData[0].user_Location}`}</div>
                  <div className="ColleagueMembers1Divider"></div>
                </div>
                <div className="ColleagueMembers2">
                  <div className="ColleagueMembers2ID">{`${swaggerData[1].user_ID} - ${swaggerData[1].user_FirstName} ${swaggerData[1].user_LastName}`}</div>
                  <div className="ColleagueMembers2Points">Points: 1587</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[1].user_Designation} | ${swaggerData[1].user_Departmenr} | ${swaggerData[1].user_Location}`}</div>
                </div>
                <div className="ColleagueMembers2Divider"></div>

                <div className="ColleagueMembers3">
                  <div className="ColleagueMembers3ID">{`${swaggerData[2].user_ID} - ${swaggerData[2].user_FirstName} ${swaggerData[2].user_LastName}`}</div>
                  <div className="ColleagueMembers3Points">Points: 1587</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[2].user_Designation} | ${swaggerData[2].user_Departmenr} | ${swaggerData[2].user_Location}`}</div>
                </div>
                <div className="ColleagueMembers3Divider"></div>

                <div className="ColleagueMembers4">
                  <div className="ColleagueMembers4ID">{`${swaggerData[3].user_ID} - ${swaggerData[3].user_FirstName} ${swaggerData[3].user_LastName}`}</div>
                  <div className="ColleagueMembers4Points">Points: 1587</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[3].user_Designation} | ${swaggerData[3].user_Departmenr} | ${swaggerData[3].user_Location}`}</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="Sidebar">
          <div className="kaninilogo"><span className="kaninilogo1">Kanini</span><span className="kaninilogo2">Assessment</span></div>
          <div className="kaninilogo3">
          </div>
          {/* <div className="Sidebar"> */}
          <button className="dashboard">Dashboard</button>
          <div className="dashboard1">
          </div>
          <button className="Takeass">Take Assessment</button>
          <div className="Takeass1">
          </div>
          <button className="Allocateass">Allocated Assessment</button>
          <div className="Allocateass1">
          </div>
          <button className="Result">Result</button>
          <div className="Result1_">
          </div>
          <button className="Settings">Settings</button>
          <div className="Settings1_">
          </div>
          <button className="Logout">Logout</button>
          <div className="Logout1">
          </div>
        </div>
      </div>
      <div className="Topbar"></div>

      <div className="WelcomeTitle">Welcome</div>
      <div className="WelcomeDetails">
        View complete details of all locations and their corresponding details.
      </div>

      <button className="AddQuestionsButton">
        <div className="AddQuestionsText">Add Questions</div>
        <div className="AddQuestionsButtonVector_">
          <img src="assets/EmployeeDashboardImages/AddQuestions.svg" alt="" />
        </div>
      </button>

      <div className="EmployeeProfile">
        <div className="ProfilePicture">
          {userImageURL && (
            <img
              src={userImageURL}
              alt="User Profile"
            />
          )}
        </div>
        <div className="ProfileName">
          {profileData && profileData[0].user_FirstName}  {profileData && profileData[0].user_LastName}
        </div>
        <div className="EmployeeID"> {profileData && profileData[0].user_ID}</div>
        <div className="EmployeePosition"> {profileData && profileData[0].user_Departmenr}</div>
        <div className="EmployeeRole">{profileData && profileData[0].user_Designation}</div>
      </div>
    </div>
  );
}
