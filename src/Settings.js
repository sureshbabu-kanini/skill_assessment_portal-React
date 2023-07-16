import React from 'react';
import './Settings.css';

export default function Settings() {
  return (
    <div>
      <div className="primarynavigation">
        <div className="d-flex">
          <div className="sidebar">
            <a className="active" href="/">Dashboard</a>
            <a href="/">Take Assessment</a>
            <a href="/">Allocated Assessment</a>
            <a href="/">Result</a>
            <a href="/">Team Members</a>
            <a href="/">Settings</a>
            <a href="/">Logout</a>
          </div>
          <div className="content">
            {/* Your page content goes here */}
          </div>
        </div>
      </div>

      <div className="topbar">
        {/* Topbar content */}
      </div>

      <div className="profile"></div>
      <div className="background"></div>
      {/* userid and his name */}
      <div className="userid">2358-Mahendra modi</div>
      <div className="desiganation">Senior Associate - IT Application Development</div>

      <div>
        <button className="my-button">
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

      <form>
        <input type="text" id="firstName" name="firstName" required />
        <input type="text" id="lastname" name="LASTNAME" required />
        <select id="department" name="department" required>
          <option value="">-- Please select a department --</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="hr">Human Resources</option>
          <option value="it">Information Technology</option>
        </select>
        <input type="date" id="date" name="date" required />
        <select id="gender" name="gender" required>
          <option value="">-- Please select your gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non-binary</option>
        </select>
        <input type="text" id="educationlevel" name="educationLevel" required />
        <button id="submitbtn" type="submit">Submit</button>
      </form>

      <div className="contactdetails">Contact Details</div>
      <div className="email">Email</div>
      <div className="phonenumber">Phone Number</div>
      <div className="location">Location</div>
      <div className="addre">Address</div>

      <div className="person2">
        <form>
          <input type="email" id="email" name="email" required />
          <input type="number" id="phonenumber" name="phonenumber" required />
          <select id="location" name="location" required>
            <option value="chennai">Chennai</option>
            <option value="bangalore">Bangalore</option>
            <option value="noida">Noida</option>
            <option value="coimbature">Coimbature</option>
          </select>
          <input type="text" id="addresssd" name="addresss" required />
        </form>
      </div>

      <div className="changepass">Change password</div>

      <div className="profilephoto"></div>

      <div className="profileimg"></div>
    </div>
  );
}
