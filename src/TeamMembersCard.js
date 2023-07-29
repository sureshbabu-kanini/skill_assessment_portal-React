import React, { useEffect, useState } from 'react';
import './TeamMembersCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import allocateass from './assets/TeamMembersCard/allocateass.svg';
import das from './assets/TeamMembersCard/das.svg';
import takeass from './assets/TeamMembersCard/takeass.svg';
import kaninilogo from './assets/TeamMembersCard/kaninilogo.svg';
import result from './assets/TeamMembersCard/result.svg';
import setting from './assets/TeamMembersCard/setting.svg';
import logout from './assets/TeamMembersCard/logout.svg';
import cardlocation from './assets/TeamMembersCard/cardlocation.svg';
import notificationIcon from './assets/TeamMembersCard/notification.svg';
import klogo from './assets/TeamMembersCard/klogo.svg';
import team1 from './assets/TeamMembersCard/teammem.svg';
import  Search  from './assets/TeamMembersCard/search.svg';
import bg from './assets/TeamMembersCard/bg.svg';

const TeamMembersCard = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleCardClick = (userId) => {
    navigate(`/TeamMembers/${userId}`);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('https://localhost:7198/api/Users');
      const data = response.data;
      console.log(data);

      // Update the state with the fetched team members
      setTeamMembers(data);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    }
  };

  const getButtonClassName = (path) => {
    return location.pathname === path ? 'activeButton' : 'inactiveButton';
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  

  // Filter the team members based on the search query
  const filteredMembersList = teamMembers.filter((member) => {
    const fullName = `${member.user_ID}-${member.user_FirstName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // New feature: Display the list of filtered members
  const renderFilteredMembersNew = () => {
    return filteredMembersList.map((member, index) => (
      <div key={member.user_ID} className={`member-card${index + 1} ${index === 0 ? 'show' : 'hide'}`}>
        <div className={`name${index + 1}`}>
          {member.user_ID} - {member.user_FirstName} {member.user_LastName}
        </div>
        <div className={`role${index + 1}`}>
          {member.user_Departmenr} - {member.user_Designation}
        </div>
        {index < 6 && (
          <>
            <div className={`lo${index + 1}new`}>{member.user_Location}</div>
            <div
              className={`mail${index + 1}`}
              onClick={() => handleCardClick(member.user_ID)}
            >
              {/* Mail Icon */}
              <i className="mail-icon fas fa-envelope"></i>
              {/* Mail Address */}
              {member.user_Email}
              {/* Copy Icon */}
              <i className="copy-icon fas fa-copy"></i>
            </div>
          </>
        )}
      </div>
    ));
  };

  const handleProfileClick = (userId) => {
    navigate(`/member-details/${userId}`);
  };
  

  const handleClickProfile1New = () => {
    handleProfileClick(12345);
  };
  const handleClickProfile2New = () => {
    handleProfileClick(54321);
  };
  const handleClickProfile3New = () => {
    handleProfileClick(98765);
  };
  const handleClickProfile4New = () => {
    handleProfileClick(67890);
  };
  const handleClickProfile5New = () => {
    handleProfileClick(13579);
  };
  const handleClickProfile6New = () => {
    handleProfileClick(24680);
  };  return (
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
      <div className="bellNew">
  <img src={notificationIcon} alt="Notification" />
</div>



      <div className="navbarNew"></div>
      <div className="sboxNew">
        <label>
          <img id="searchicon" src={Search} alt="" />
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="seNew"
          placeholder="Search Employee"
        />
      </div>

      <div className="headingNew">Team Members</div>
      <div className="subheadingNew">Add question under the selected department and topics</div>

      <div className="ReportMangerNew"></div>
      <div className="RMNew">Reporting Manager</div>
      <div className="RMnameNew">2-Abraar</div>
      <div className="categoryNew"></div>
      <div className="cNameNew">Best Performers</div>
      <div className="ViewAllNew">View All</div>

      {/* <div className="logo1">
        <img className="rounded-circle" alt="image" width="60" height="60" />
      </div>
      <div className="logo2">
        <img className="rounded-circle"  alt="image" width="60" height="60" />
      </div>
      <div className="logo3">
        <img className="rounded-circle"  alt="image" width="60" height="60" />
      </div>
      <div className="logo4">
        <img className="rounded-circle"  alt="image" width="60" height="60" />
      </div>
      <div className="logo5">
        <img className="rounded-circle"  alt="image" width="60" height="60" />
      </div>
      <div className="logo6">
        <img className="rounded-circle"  alt="image" width="60" height="60" />
      </div> */}
      
      <div className="profile1New" onClick={() => handleClickProfile1New(12345)}></div>
      <div className="profile2New" onClick={() => handleClickProfile2New(54321)}></div>
      <div className="profile3New" onClick={() => handleClickProfile3New(98765)}></div>
      <div className="profile4New" onClick={() => handleClickProfile4New(67890)}></div>
      <div className="profile5New" onClick={() => handleClickProfile5New(13579)}></div>
      <div className="profile6New" onClick={() => handleClickProfile6New(24680)}></div>



      {/* New feature: Render the list of filtered members */}
      {renderFilteredMembersNew()}
    
    <div className="rectangleNew">
      {/* <img src={bg} alt=''/> */}
    </div>

      <div className="lvl1">Skill Level: Beginner</div>
      <div className="lvl2">Skill Level: Intermediate</div>
      <div className="lvl3">Skill Level: Beginner</div>
      <div className="lvl4">Skill Level: Beginner</div>
      <div className="lvl5">Skill Level: Beginner</div>
      <div className="lvl6">Skill Level: Intermediate</div>

      <div className="pgb1new"></div>
      <div className="pgb2new"></div>
      <div className="pgb3new"></div>
      <div className="pgb4new"></div>
      <div className="pgb5new"></div>
      <div className="pgb6new"></div>

      <div className="lo1new">
        <img id="location1new" src={cardlocation} alt="" />
        {/* <span>Chennai</span> */}
      </div>

      <div className="lo2new">
        <img id="location2new" src={cardlocation} alt="" />
        {/* <span>Coimbatore</span> */}
      </div>

      <div className="lo3new">
        <img id="location3new" src={cardlocation} alt="" />
        {/* <span>Chennai</span> */}
      </div>
      <div className="lo4new">
        <img id="location4new" src={cardlocation} alt="" />
        {/* <span>Banglore</span> */}
      </div>

      <div className="lo5new">
        <img id="location5new" src={cardlocation} alt="" />
        {/* <span>Bangalore</span> */}
      </div>

      <div className="lo6new">
        <img id="location6new" src={cardlocation} alt="" />
        {/* <span>Pune</span> */}
      </div>


      <div className="bpp1">Points: 1587</div>
      <div className="bpp2">Points: 1587</div>
      <div className="bpp3">Points: 1587</div>
      <div className="bpp4">Points: 1587</div>

      <div className="bpr1">
        <img className="rounded-circle"  alt="image" width="55" height="55" />
      </div>
      <div className="bpic1">
        <img className="rounded-circle"  alt="image" width="55" height="55" />
      </div>
      <div className="bpic2">
        <img className="rounded-circle"  alt="image" width="55" height="55" />
      </div>
      <div className="bpic3">
        <img className="rounded-circle"  alt="image" width="55" height="55" />
      </div>
      <div className="bpic4">
        <img className="rounded-circle"  alt="image" width="55" height="55" />
      </div>

      <div class="tboxnew">
  <label>
    <img id="searchiconnew" src={Search} alt="" />
  </label>
  <input type="text" class="senew" placeholder="Search here" />
</div>


      <div className="klogonew">
        <img id="kanininew" src={klogo} alt="" />
      </div>

      <div className='navname'>Subramaniyam</div>   

      <div className="hr"></div>
   <div className="hr1"></div>
   <div className="hr2"></div>
   
</div>
  )};


export default TeamMembersCard;