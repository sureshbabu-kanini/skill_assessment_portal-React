import './EmployeeDashboard.css';
import React, { useEffect, useState } from 'react';
import AssessmentsBulb from './assets/EmployeeDashboardImages/Bulb.png';

export default function EmployeeDashboard() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Retrieve userEmail from local storage
    const userEmail = localStorage.getItem('userEmail');

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetByEmail?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        console.log(data)
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Handle the error, e.g., set a default profileData or display an error message
      }
    };

    fetchData();
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
      <div className="NumberOfPointsEarned">150</div>

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
        <div className="ReportingManagerProfilePicture">
          <img src="assets/EmployeeDashboardImages/ReportingManagerPic.svg" alt="" />
        </div>
        <div className="ReportingManagerName">Sachin Borkar</div>
        <div className="ReportingManagerRole">2080 | Manager</div>
      </div>

      <div className="YourHRspocTitle">Your HR-spoc</div>
      <div className="YourHRspocProfile">
        <div className="YourHRspocProfilePicture"></div>
        <div className="YourHRspocName">Sriram</div>
        <div className="YourHRspocRole">2080 | Manager</div>
      </div>

      <div className="Colleague">
        <div className="ColleagueTitle">Colleague</div>
        <div className="ViewAllColleague">View All</div>
        <div className="ColleagueMembers">
          <div className="ColleagueMembers1">
            <div className="ColleagueMembers1ID">2036 - Somogyi Adrian</div>
            <div className="ColleagueMembers1Points">Points: 1587</div>
            <div className="ColleagueMembers1RoleSkillLevel">
              Senior Associate | Basic Chennai
            </div>
            <div className="ColleagueMembers1Divider"></div>
          </div>
          <div className="ColleagueMembers2">
            <div className="ColleagueMembers2ID">2036 - Somogyi Adrian</div>
            <div className="ColleagueMembers2Points">Points: 1587</div>
            <div className="ColleagueMembers1RoleSkillLevel">Senior Associate Pune</div>
          </div>
          <div className="ColleagueMembers3">
            <div className="ColleagueMembers3ID">2036 - Somogyi Adrian</div>
            <div className="ColleagueMembers3Points">Points: 1587</div>
            <div className="ColleagueMembers1RoleSkillLevel">Senior Associate</div>
          </div>
          <div className="ColleagueMembers4">
            <div className="ColleagueMembers4ID">2036 - Somogyi Adrian</div>
            <div className="ColleagueMembers4Points">Points: 1587</div>
            <div className="ColleagueMembers1RoleSkillLevel">Senior Associate</div>
          </div>
        </div>
      </div>

      <div className="Sidebar"></div>
      <div className="Topbar"></div>

      <div className="WelcomeTitle">Welcome</div>
      <div className="WelcomeDetails">
        View complete details of all locations and their corresponding details.
      </div>

      <button className="AddQuestionsButton btn">
        <div className="AddQuestionsText">Add Questions</div>
        <div className="AddQuestionsButtonVector">
          <img src="assets/EmployeeDashboardImages/AddQuestions.svg" alt="" />
        </div>
      </button>

      <div className="EmployeeProfile">
        <div className="ProfilePicture"></div><div className="ProfileName">
          {profileData &&  profileData[0].user_FirstName}  {profileData && profileData[0].user_LastName}
        </div>
        <div className="EmployeeID"> {profileData && profileData[0].user_ID}</div>
        <div className="EmployeePosition"> {profileData && profileData[0].user_Departmenr}</div>
        <div className="EmployeeRole">{profileData && profileData[0].user_Designation}</div>
      </div>
    </div>
    </div>
  );
}
