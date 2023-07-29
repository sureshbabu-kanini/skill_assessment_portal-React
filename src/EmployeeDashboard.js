
import './EmployeeDashboard.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import das from './assets/TeamMembersCard/das.svg';
import takeass from './assets/TeamMembersCard/takeass.svg';
import kaninilogo from './assets/TeamMembersCard/kaninilogo.svg';
import allocateass from './assets/TeamMembersCard/allocateass.svg';
import result from './assets/TeamMembersCard/result.svg';
import team1 from './assets/TeamMembersCard/teammem.svg';
import setting from './assets/TeamMembersCard/setting.svg';
import logout from './assets/TeamMembersCard/logout.svg';
import AssessmentsBulb from './assets/EmployeeDashboardImages/Bulb.png';

export default function EmployeeDashboard() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userImageURL, setUserImageURL] = useState('');
  const [swaggerData, setSwaggerData] = useState([]);
  const [totalPoints, setTotalPoints] = useState('0');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetByEmail?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
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
      if (!userID) return;

      // Add random query parameter to avoid caching
      const randomQueryParam = Math.random().toString(36).substring(7);
      const response = await fetch(`https://localhost:7198/api/Results/GetTotalPointsByUserId/${userID}?rnd=${randomQueryParam}`);
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

  const fetchResultCount = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`https://localhost:7198/api/Users/GetUsersByEmailWithResultCount?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      if (data && Array.isArray(data) && data.length > 0) {
        const resultCount = data[0].resultCount;
        document.querySelector('.NumberOfCompletedAssessed').textContent = `${resultCount}`;
      }
    } catch (error) {
      console.error('Error fetching result count:', error);
    }
  };

  useEffect(() => {
    fetchResultCount();
  }, []);

  const getButtonClassName = (path) => {
    return window.location.pathname === path ? 'activeButton' : 'inactiveButton';
  };

  return (
    <div className='MainDiv'>
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
        <div className="NumberOfCompletedAssessed"></div>

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
                  <div className="ColleagueMembers1Points">Points: {`${swaggerData[0].totalPoints}`}</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[0].user_Designation} | ${swaggerData[0].user_Departmenr} | ${swaggerData[0].user_Location}`}</div>
                  <div className="ColleagueMembers1Divider"></div>
                </div>
                <div className="ColleagueMembers2">
                  <div className="ColleagueMembers2ID">{`${swaggerData[1].user_ID} - ${swaggerData[1].user_FirstName} ${swaggerData[1].user_LastName}`}</div>
                  <div className="ColleagueMembers1Points">Points: {`${swaggerData[1].totalPoints}`}</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[1].user_Designation} | ${swaggerData[1].user_Departmenr} | ${swaggerData[1].user_Location}`}</div>
                </div>
                <div className="ColleagueMembers2Divider"></div>

                <div className="ColleagueMembers3">
                  <div className="ColleagueMembers3ID">{`${swaggerData[2].user_ID} - ${swaggerData[2].user_FirstName} ${swaggerData[2].user_LastName}`}</div>
                  <div className="ColleagueMembers1Points">Points: {`${swaggerData[2].totalPoints}`} </div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[2].user_Designation} | ${swaggerData[2].user_Departmenr} | ${swaggerData[2].user_Location}`}</div>
                </div>
                <div className="ColleagueMembers3Divider"></div>

                <div className="ColleagueMembers4">
                  <div className="ColleagueMembers4ID">{`${swaggerData[3].user_ID} - ${swaggerData[3].user_FirstName} ${swaggerData[3].user_LastName}`}</div>
                  <div className="ColleagueMembers1Points">Points: {`${swaggerData[3].totalPoints}`}</div>
                  <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[3].user_Designation} | ${swaggerData[3].user_Departmenr} | ${swaggerData[3].user_Location}`}</div>
                </div>
              </>
            )}
          </div>
        </div>

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
      </div>
      );
}
