import React, { useState } from 'react';
import axios from 'axios';
import './Settings.css';

const Settings = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    department: '',
    designation: '',
    dateOfBirth: '',
    gender: '',
    educationLevel: '',
    email: '',
    phoneNumber: '',
    location: '',
    address: ''
  });

  const fetchUserData = async () => {
    // Retrieve userEmail from local storage
    const userEmail = localStorage.getItem('userEmail');

    // Fetch user data based on userEmail
    try {
      const response = await axios.get(
        `https://localhost:7198/api/Users/GetByEmail?userEmail=${userEmail}`
      );
      const user = response.data[0];

      // Update the state with the fetched user data
      setUserData({
        id: user.user_ID,
        firstName: user.user_FirstName,
        lastName: user.user_LastName,
        department: user.user_Departmenr,
        designation: user.user_Designation,
        dateOfBirth: user.user_DOB,
        gender: user.user_Gender,
        educationLevel: user.user_EduLevel,
        email: user.user_Email,
        phoneNumber: user.user_PhoneNo,
        location: user.user_Location,
        address: user.user_Address
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditMode(true);
    fetchUserData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the updated user data object
    const updatedUserData = {
      user_ID: userData.id,
      user_FirstName: isEditMode ? userData.firstName : userData.user_FirstName,
      user_LastName: isEditMode ? userData.lastName : userData.user_LastName,
      user_Departmenr: isEditMode ? userData.department : userData.user_Departmenr,
      user_Designation: isEditMode ? userData.designation : userData.user_Designation,
      user_DOB: isEditMode ? userData.dateOfBirth : userData.user_DOB,
      user_Gender: isEditMode ? userData.gender : userData.user_Gender,
      user_EduLevel: isEditMode ? userData.educationLevel : userData.user_EduLevel,
      user_Email: isEditMode ? userData.email : userData.user_Email,
      user_PhoneNo: isEditMode ? userData.phoneNumber : userData.user_PhoneNo,
      user_Location: isEditMode ? userData.location : userData.user_Location,
      user_Address: isEditMode ? userData.address : userData.user_Address
    };
  
    try {
      // Send a PUT request to update the user data
      await axios.put(`https://localhost:7198/api/Users/${userData.id}`, updatedUserData);
  
      // Display a success message or perform any other necessary actions
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  
    setIsEditMode(false);
  };  

  return (
    <div>
      <div className="primarynavigation">
        {/* Sidebar and content sections */}
      </div>

      <div className="topbar"></div>

      <div className="profile"></div>
      <div className="background"></div>

      <div className="userid">{userData.id}   {userData.firstName} {userData.lastName}</div>
      <div className="desiganation">
        {userData.designation} - {userData.department}
      </div>

      <div>
        <button className="my-button" onClick={handleEditButtonClick}>
          <span className="button-text">Edit me</span>
        </button>
      </div>

      <div className="person1"></div>

      <span className="titperson">Personal</span>
      <div className="name">First name</div>
      <div className="lname">Last name</div>
      <div className="dept">Department</div>
      <div className="dob">Date of Birth</div>
      <div className="gender">Gender</div>
      <div className="education">Education level</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={userData.firstName}
          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          readOnly={!isEditMode}
        />
        <input
          type="text"
          id="lastname"
          name="LASTNAME"
          required
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          readOnly={!isEditMode}
        />
        <select
          id="department"
          name="department"
          required
          value={userData.department}
          onChange={(e) => setUserData({ ...userData, department: e.target.value })}
          disabled={!isEditMode}
        >
          <option value="">-- Please select a department --</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Information Technology">Information Technology</option>
        </select>
        <input
          type="date"
          id="date"
          name="date"
          required
          value={userData.dateOfBirth ? userData.dateOfBirth.substring(0, 10) : ''}
          onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
          readOnly={!isEditMode}
        />

        <select
          id="gender"
          name="gender"
          required
          value={userData.gender}
          onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
          disabled={!isEditMode}
        >
          <option value="">-- Please select your gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non-binary</option>
        </select>


        <input
          type="text"
          id="educationlevel"
          name="educationLevel"
          required
          value={userData.educationLevel}
          onChange={(e) => setUserData({ ...userData, educationLevel: e.target.value })}
          readOnly={!isEditMode}
        />

        {isEditMode && (
          <button className="btn btn-primary" id="submitbtn" type="submit">
            Submit
          </button>
        )}
      </form>

      <div className="contactdetails">Contact Details</div>
      <div className="email">Email</div>
      <div className="phonenumber">Phone Number</div>

      <div className="location">location</div>
      <div className="addre">Address</div>

      <div className="person2">
        <form>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            readOnly={!isEditMode}
          />
          <input
            type="number"
            id="phonenumber"
            name="phonenumber"
            required
            value={userData.phoneNumber}
            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
            readOnly={!isEditMode}
          />

          <select
            id="location"
            name="location"
            required
            value={userData.location}
            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
            disabled={!isEditMode}
          >
            <option value="sales">Chennai</option>
            <option value="marketing">Bangalore</option>
            <option value="hr">Noida</option>
            <option value="it">Coimbatore</option>
          </select>

          <input
            type="text"
            id="addresssd"
            name="addresss"
            required
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            readOnly={!isEditMode}
          />
        </form>
      </div>

      <button className="changepass">Change Password</button>

      <div className="profilephoto"></div>

      <div className="profileimg"></div>
    </div>
  );
};

export default Settings;
