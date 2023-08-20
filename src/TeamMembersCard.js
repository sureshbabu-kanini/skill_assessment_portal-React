import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from './UserDataContext';
import axios, { all } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faCopy } from '@fortawesome/free-solid-svg-icons';


import klogo from './assets/TeamMembersCard/klogo.svg';
import Search from './assets/TeamMembersCard/search.svg';
import result from './assets/TeamMembersCard/result.svg';
import setting from './assets/TeamMembersCard/setting.svg';
import allocate from './assets/TeamMembersCard/allocateass.svg';
import take from './assets/TeamMembersCard/takeass.svg';
import dashboard from './assets/TeamMembersCard/das.svg';
import logout from './assets/TeamMembersCard/logout.svg';
import team from './assets/TeamMembersCard/teammem.svg';
import kanini from './assets/TeamMembersCard/kaninilogo.svg';
import bg from './assets/TeamMembersCard/bg.svg';


export default function TeamMembers() {
  const userDataNew = useContext(UserDataContext);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState(''); // New state for search input
  const [userImageURLs, setUserImageURLs] = useState({});

  const cardsPerPage = 6;

  useEffect(() => {
    axios
      .get('https://localhost:7198/api/Users')
      .then(response => {
        setUserData(response.data);
        const imageURLs = {};

        response.data.forEach(user => {
          if (user.user_Image) {
            const binaryData = atob(user.user_Image);
            const byteArray = new Uint8Array(binaryData.length);

            for (let i = 0; i < binaryData.length; i++) {
              byteArray[i] = binaryData.charCodeAt(i);
            }

            const blob = new Blob([byteArray]);
            const imageURL = URL.createObjectURL(blob);
            imageURLs[user.user_ID] = imageURL;
          }
        });

        setUserImageURLs(imageURLs);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const bestPerformers = userData.slice(0, 4); // Assuming you want to display top 4 users as best performers

  const classNames = ['name1', 'name2', 'name3', 'name4']; // Use the same className names you've mentioned



  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const filteredData = userData.filter(user => {
    const fullName = `${user.user_FirstName} ${user.user_LastName}`.toLowerCase();
    const firstLetters = searchInput.toLowerCase().split(' ');

    return firstLetters.every(letter => fullName.startsWith(letter));
  });
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const handleSearch = event => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset page to 1 when searching
  };
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const handleCardClick = (cardId) => {
    // Modify the URL to include the card's ID as a parameter
    window.location.href = `/TeamMembers/${cardId}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '0vh' }}>
      <style>
        {`
             .card-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: 100px;
                margin-right: 200px;
                width: 100%;
              }
              
              .card-row {
                display: flex;
                gap: 15px;
              }
              
              .card {
                box-sizing: border-box;
                width: 310px;
                height: 300px;
                background: #FFFFFF;
                border: 1px solid black;
                border-radius: 8px;
                padding: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                margin-top: 5px;
              }
              
              .profile-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                object-position: top; /* Adjusted property for top part */
                border-radius: 50%;
                margin-bottom: 10px;
              }
              
              
              .role,
              .lvl1,
              .loc,
              .mail-line {
                margin-top: 10px;
              }
              
              .progress-container {
                width: 100%;
                height: 4.25px;
                background: #ccc;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 5px;
              }
              
              .progress-bar {
                width: 70%;
                height: 100%;
                background: #AAD064;
                border-radius: 4px;
              }
              
              .location-icon,
              .mail-icon,
              .copy-icon {
                margin-right: 10px;
              }
              
              .mail-line {
                display: flex;
                align-items: center;
                margin-top: 5px;
              }
              
              .card-row1 {
                display: flex;
                gap: 15px;
                margin-top: 20px; /* Add some space between the first and second row */
                justify-content: center; /* Center the cards horizontally */
              }
             
    
              .ReportManger{
                box-sizing: border-box;
                position: absolute;
                width: 430px;
                height: 185px;
                left: 1442px;
                top: 200px;
                background: #FFFFFF;
                border: 1px solid #EAE9EA;
              }
              .RMNew{
                position: absolute;
                width: 173px;
                height: 25px;
                left: 1472px;
                top: 140px;
                font-family: 'Manrope';
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 25px;
                color: #1F2131;
              }
              .RMnameNew{
                position: absolute;
                width: 121px;
                height: 22px;
                left: 1559px;
                top: 220px;
                font-family: 'Manrope';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;
                color: #787878;
              }
    
              .cNameNew{
                position: absolute;
            width: 137px;
            height: 25px;
            left: 1472px;
            top: 419px;
            
            /* Subheading/Medium/18Px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 25px;
            /* identical to box height */
            
            
            color: #1F2131;
            
            }
            .ViewAllNew{
                position: absolute;
            width: 350px;
            height: 19px;
            left: 1483px;
            top: 419px;
            
            /* Medium/14px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 15px;
            text-align: right;
            
            /* INFO_COLOR/INFO-300 */
            
            color: #1465B4;
            }
            .bpp1{
                position: absolute;
            width: 82px;
            height: 19px;
            left: 1560px;
            top: 585px;
            
            /* Medium/14px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            
            color: #000000;
            }
            .bpp2{
                position: absolute;
            width: 82px;
            height: 19px;
            left: 1550px;
            top: 690px;
            
            /* Medium/14px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            
            color: #000000;
            
            }
            
            .bpp3{
                position: absolute;
            width: 82px;
            height: 19px;
            left: 1553px;
            top: 798px;
            
            /* Medium/14px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            
            color: #000000;
            }
            .bpp4{
                position: absolute;
            width: 82px;
            height: 19px;
            left: 1560px;
            top: 905px;
            
            /* Medium/14px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            
            color: #000000;
            }
           
             
            
              .headingNew{
                position: absolute;
            width: 173px;
            height: 33px;
            left: 340px;
            top: 31px;
            
            /* H1 heading/Semibold/24px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 33px;
            /* identical to box height */
            
            
            /* TEXT_COLOR/TEXT-800 */
            
            color: #242D35;
            
            }
            .subheadingNew{
                position: absolute;
            width: 336px;
            height: 18px;
            left: 345px;
            top: 71px;
            
            /* Caption/Regular/13px */
            
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 18px;
            /* identical to box height */
            
            
            /* TEXT_COLOR/TEXT-400 */
            
            color: #A8B0B9;
            }
            
          .klogonew {
              position: absolute;
              width: 48px;
              height: 48px;
              left: 1623px;
              top: 25px;
              border-radius: 50%;
              overflow: hidden;
            }
            
            .klogonew img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .navname{
              /* Subramaniyam */

          position: absolute;
          width: 126px;
          height: 25px;
          left: 1675px;
          top: 35px;

          font-family: 'Manrope';
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 25px;
          /* identical to box height */

          /* TEXT_COLOR/TEXT-800 */
          color: #242D35;


          }

          .tboxnew {
            position: absolute;
            width: 386px;
            height: 40px;
            left: 1213px;
            top: 38px;
          }

          /* Apply styles to the input field */
          .senew {
            box-sizing: border-box;
            position: absolute;
            left: 0%;
            right: 0%;
            top: 0%;
            bottom: 0%;
            background: #FFFFFF;
            /* TEXT_COLOR/TEXT-300 */
            border: 0.8px solid #D6DADE;
            border-radius: 4.8px;
            padding-left: 20px; /* Adjust as needed */
            padding-right: 20px; /* Adjust as needed */
            outline: none;
            width: 100%; /* Take up the full available width */
            font-size: 16px; /* Adjust font size as needed */
          }

          .searchiconnew {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 10px; /* Adjust the left position as needed */
            transform: translateY(-50%);
          }

            .has-search .form-control {
              padding-right: 2.375rem;
              margin-top:100px;
              margin-right:200px

            }
            
            .has-search .form-control-feedback {
              position: absolute;
              z-index: 2;
              display: block;
              width: 2.375rem;
              height: 2.375rem;
              line-height: 2.375rem;
              text-align: center;
              pointer-events: none;
              color: #aaa;
              margin-top:100px;
              margin-right:200px
            }
            .pagination-container {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
            .pagination-button {
              margin: 0 5px; /* Add margin to create a gap between buttons */
              padding: 5px 10px;
              background-color: #ccc;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }

            .bpic1{
              position: absolute;
          width: 70px;
          height: 70px;
          left: 1473px;
          top: 534px;
          }
          .bpic2{
              position: absolute;
          width: 70px;
          height: 70px;
          left: 1473px;
          top: 630px;
          }
          .bpic3{
              position: absolute;
          width: 70px;
          height: 70px;
          left: 1473px;
          top: 740px;
          }

          .bpic4{
              position: absolute;
          width: 70px;
          height: 70px;
          left: 1473px;
          top: 850px;
          }
          .bpic5{
              position: absolute;
          width: 70px;
          height: 70px;
          left: 1473px;
          top: 940px;
          }
          .bpr1{
            position: absolute;
          width: 70px;
          height: 70px;
          left: 1473px;
          top: 220px;
          }
          .hr{
            /* sep */

          position: absolute;
          width: 430px;
          height: 0px;
          left: 1443px;
          top: 620px;

          border: 1px solid #DCDCDC;

          }
          .hr1{
          /* sep */

          position: absolute;
          width: 430px;
          height: 0px;
          left: 1443px;
          top: 729px;

          border: 1px solid #DCDCDC;

          }
          .hr2{
            /* sep */

          position: absolute;
          width: 430px;
          height: 0px;
          left: 1443px;
          top: 844px;

          border: 1px solid #DCDCDC;

          }
          /* ... Your other styles ... */

          .name1, .name2, .name3, .name4 {
            position: absolute;
            width: 150px; /* Adjust as needed */
            height: 30px; /* Adjust as needed */
            /* Add other properties as per your original CSS */
            /* ... */
            font-size: 10px; /* Adjust the font size as needed */
          }

          .name1 {
            left: 1558px;
            top: 535px;
          }

          .name2 {
            left: 1550px;
            top: 640px;
          }

          .name3 {
            left: 1553px;
            top: 745px;
          }

          .name4 {
            left: 1563px;
            top: 850px;
          }


          .small-text {
            font-size: 14px; /* Adjust the font size as needed */
          }
          .Sidebar{
            position: absolute;
          width: 300px;
          height: 1080px;
          left: 0px;
          top: 0px;
          background: linear-gradient(179.54deg, #AFE0F4 5.55%, #E1EEC8 194.36%);
          }
          .kaninilogo { 
            width:93px;
            height:47px;
            position:absolute;
            left:123px;
            top:50px;
          }
          .kaninilogo1 { 
            color:rgba(12.000000234693289, 17.00000088661909, 22.000000588595867, 1);
            width:93px;
            height:33px;
            position:absolute;
            left:0px;
            top:0px;
            font-family:Roboto;
            text-align:left;
            font-size:28px;
            letter-spacing:10;
          }
          .kaninilogo2 { 
            color:rgba(55.17031118273735, 63.178905844688416, 71.18750050663948, 1);
            width:93px;
            height:19px;
            position:absolute;
            left:0px;
            top:28px;
            font-family:Manrope;
            text-align:left;
            font-size:14px;
            letter-spacing:9;
          }
          .kaninilogo3 { 
            width:47px;
            height:47px;
            position:absolute;
            left:50px;
            top:50px;
            background-repeat:no-repeat;
            background-size:cover;
          }
          .dashboard { 
            position:absolute;
            left:83px;
            top:155px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;
          }
          .dashboard1 { 
            position:absolute;
            left:45px;
            top:154px;
            right:237px;
            bottom:905px;
          }
          .Takeass { 
            position:absolute;
            left:83px;
            top: 238px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;
          }
          .Takeass1 { 
            position:absolute;
            left:45px;
            top:239px;
            right:237px;
            bottom:824.39px;
          }
          .Allocateass { 
            position:absolute;
            left:83px;
            top: 320px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;
          }
          .Allocateass1 { 
            position:absolute;
            left:45px;
            top:321px;
            right:240px;
            bottom:741px;
          }
          .teammem{
            position:absolute;
            left:83px;
            top: 390px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;

          }
          .teammem1{
            position:absolute;
            left:45px;
            top:390px;
            right: 235px;
            bottom: 574.95px;

          }
          .Result { 
            position:absolute;
            left:83px;
            top: 460px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;
          }
          .Result1 { 
            position:absolute;
            left:45px;
            top:454px;
            right:240px;
            bottom: 656px;
          }

          .Settings{
            position:absolute;
            left:83px;
            top: 520px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;

          }
          .Settings1{
            position:absolute;
            left:45px;
            top:515px;
            right: 237px;
            bottom: 491.38px;

          }
          .Logout{
            position:absolute;
            left:85px;
            top: 991px;
            font-family:Manrope;
            text-align:left;
            font-size:16px;
            letter-spacing:0;
            cursor: pointer;

          }
          .Logout1{
            position:absolute;
            left:45px;
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

          background: url(icons/copy.svg); 
          opacity: 3.06;

          }    
            `}
      </style>

      <div className="form-group has-search" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '690px' }}>
        <span className="fa fa-search form-control-feedback"></span>
        <input type="text" className="form-control" placeholder="Search Employee" value={searchInput} onChange={handleSearch} style={{ paddingRight: '6.375rem' }} />

      </div>
      <div className="Sidebar">
        <div className="kaninilogo"><span className="kaninilogo1">Kanini</span><span className="kaninilogo2">Assessment</span></div>
        <div className="kaninilogo3">
          <img src={kanini} />
        </div>
        <span className="dashboard">Dashboard</span>
        <div className="dashboard1">
          <img src={dashboard} />
        </div>
        <span className="Takeass">Take Assessment</span>
        <div className="Takeass1">
          <img src={take} />
        </div>
        <span className="Allocateass">Allocated Assessment</span>
        <div className="Allocateass1">
          <img src={allocate} />
        </div>
        <span className="teammem">Team Members</span>
        <div className="teammem1">
          <img src={team} />
        </div>
        <span className="Result">Result</span>
        <div className="Result1">
          <img src={result} />
        </div>
        <span className="Settings">Settings</span>
        <div className="Settings1">
          <img src={setting} />
        </div>

        <span className="Logout">Logout</span>
        <div className="Logout1">
          <img src={logout} />
        </div>
        <div className="rectangleNew">
        </div>
      </div>
      <div className="headingNew">Team Members</div>
      <div className="subheadingNew">Add question under the selected department and topics</div>

      <div className="tboxnew">
        <label>
          <img id="searchiconnew" src={Search} alt="" />
        </label>
        <input type="text" className="senew" placeholder="Search here" />
      </div>

      <div className="klogonew">
        <img id="kanininew" src={klogo} alt="" />
      </div>

      <div className='navname'>Subramaniyam</div>


      <div className="card-container">
        <div className="card-row">
          {currentCards.slice(0, 3).map((user, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(user.user_ID)} // Attach click handler
            >
              <img
                src={userImageURLs[user.user_ID]}
                alt="Profile"
                className="profile-image"
              />
              <h3>{user.user_ID}-{user.user_FirstName} {user.user_LastName}</h3>
              <p>{user.user_Departmenr}-{user.user_Designation}</p>
              <div className='role'></div>
              <div className="lvl1">Skill Level: Beginner</div>
              <div className="progress-container">
                <div className="progress-bar"></div> {/* Progress bar */}
              </div>
              <div className='loc'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' />
                {user.user_Location}
              </div>
              <div className='mail-line'>
                <FontAwesomeIcon icon={faEnvelope} className='mail-icon' />
                <div className='mail'>{user.user_Email}</div>
                <FontAwesomeIcon icon={faCopy} className='copy-icon' />
              </div>
            </div>
          ))}
        </div>
        <div className="card-row1">
          {currentCards.slice(3, 6).map((user, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(user.user_ID)} // Attach click handler
            >
             <img
            src={userImageURLs[user.user_ID] || "https://img.freepik.com/premium-photo/single-pensive-portrait-young-employee_1098-6377.jpg?w=996"}
            alt="Profile"
            className="profile-image"
          />
              <h3>{user.user_ID}-{user.user_FirstName} {user.user_LastName}</h3>
              <p>{user.user_Departmenr}-{user.user_Designation}</p>
              <div className='role'></div>
              <div className="lvl1">Skill Level: Beginner</div>
              <div className="progress-container">
                <div className="progress-bar"></div> {/* Progress bar */}
              </div>
              <div className='loc'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' />
                {user.user_Location}
              </div>
              <div className='mail-line'>
                <FontAwesomeIcon icon={faEnvelope} className='mail-icon' />
                <div className='mail'>{user.user_Email}</div>
                <FontAwesomeIcon icon={faCopy} className='copy-icon' />
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="pagination-container">
        <div className="pagination">
          {Array.from({ length: Math.ceil(userData.length / cardsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className="pagination-button" // Add this className
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="ReportMangerNew"></div>
      <div className="RMNew">Reporting Manager</div>
      <div className="RMnameNew">2-Abraar</div>

      <div className="cNameNew">Best Performers</div>
      <div className="ViewAllNew">View All</div>

      {/* Display Best Performers */}
      <div className="best-performers-container">
        {bestPerformers.map((user, index) => (
          <div key={index} className={classNames[index]}>
            <h3 className="small-text">
              {user.user_ID}-{user.user_FirstName} {user.user_LastName}
            </h3>
            <p className="small-text">
              {user.user_Departmenr}-{user.user_Designation}
            </p>
          </div>
        ))}
      </div>

      <div className="bpp1">Points: 1587</div>
      <div className="bpp2">Points: 1587</div>
      <div className="bpp3">Points: 1587</div>
      <div className="bpp4">Points: 1587</div>

      <div className="bpr1">
        <img className="rounded-circle" alt="image" width="55" height="55" />
      </div>
      <div className="bpic1">
        <img className="rounded-circle" alt="image" width="55" height="55" />
      </div>
      <div className="bpic2">
        <img className="rounded-circle" alt="image" width="55" height="55" />
      </div>
      <div className="bpic3">
        <img className="rounded-circle" alt="image" width="55" height="55" />
      </div>
      <div className="bpic4">
        <img className="rounded-circle" alt="image" width="55" height="55" />
      </div>


      <div className="hr"></div>
      <div className="hr1"></div>
      <div className="hr2"></div>
      <div className="hr3"></div>


      <div className="rectangleNew">
        <img src={bg} alt='' />
      </div>

    </div>



  );
}