import React, { useState, useEffect } from 'react';
import './Result1.css';
// import vectorImage from './Vector.png';
// import clockImage from './clock.png';
// import profileImage from './bx_user.png';
import { useNavigate } from 'react-router-dom';

const Result1 = () => {
  const [userData, setUserData] = useState([]);
  const [user_name, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch('https://localhost:7198/api/Results')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setUserData(data);
        console.log(data)
        setUsername(data.length > 0 ? data[0].username : '');
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  useEffect(() => {
    // Fetch user data from the API
    fetch('https://localhost:7198/api/Users/2')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched user data:', data);
        setUsername(data.user_name); // Update the user_name state with the fetched username
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleViewClick = (ResultId) => {
    // Use navigate() to navigate to the specific result page
    navigate(`/Result/${ResultId}`);
  };
  return (
    <div>
      <div className="navv">
        {/* ... */}
        {/* Your navigation component */}
        {/* ... */}
      </div>

      <div className="topnavv">
        {/* ... */}
        {/* Your top navigation component */}
        {/* ... */}
      </div>

      {/* The rest of your component code */}
      {/* <div className="namee">subaramaniyam</div> */}
      <div className="namee">{user_name} </div>
      {/* ... */}
      <div className="AllocatedAssessmentt">Assessment Result</div>
      {/* ... */}
      <div className="viewcompletee">View complete details of all assessment you have Completed</div>
      {/* ... */}
      <div className="searchh">
      <span className="material-symbols-outlinedd" id="searchhh">
               <h6>search here......</h6>
             </span>
           
      </div>

      <div className="alll">Result</div>
      {/* Map over the userData array to render the cards */}
      {userData.map((user) => (
        <div key={user.id} className="cardd">
          <div className="cardnamed">ASS04_UXUI_001
            {user.assessment}
            <span id="editorr" className="material-symbols-outlined">
              {/* <img src={vectorImage} alt="Logo" className="vectorimage" /> */}
            </span>
          </div>
          <div className="upskil">
            <button className="btnnn">Upskill</button>
          </div>
          
          <button className="uxui">UXUI</button>
          <div className="profilee">
            <span className="material-symbols-outlinedd">
              
              {/* <img src={profileImage} alt="Logo" className="image" /> */}
              <h6 style={{ display: 'inline', fontSize: '9px' }}>Createdby:
              {user_name}
              </h6>
            </span>
            <br />
            <div>
              <span className="material-symbols-outlinedd">
                {/* <img src={clockImage} alt="Logo" className="clockimage" /> */}
                <div className='sub'>
                <h6 >Submitted on:8th Aug 2022
                 {user.submittedOn}
                 </h6></div>
              </span>
            </div>
            <div>
              <p className="pp">Result: {user.result}</p>
            </div>
            <div className="startt" onClick={()=>handleViewClick( user.result_id)}> View Result</div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Result1;