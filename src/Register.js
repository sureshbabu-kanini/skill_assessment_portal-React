import React, { useState } from 'react';
import './Register.css';
import mainlogo from './assets/SignInImages/mainlogo.svg';
import kaninilogo from './assets/SignInImages/kanini logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [formData, setFormData] = useState({
    user_FirstName: '',
    user_LastName: '',
    user_Departmenr: '',
    user_Designation: '',
    user_DOB: '',
    user_Gender: '',
    user_EduLevel: '',
    user_PhoneNo: '',
    user_Location: '',
    user_Address: '',
    user_Email: '',
    user_Password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async () => {
    try {
      const response = await fetch('https://localhost:7198/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('User created successfully.');
        toast.success('User registered successfully');
        setFormData({
          user_FirstName: '',
          user_LastName: '',
          user_Departmenr: '',
          user_Designation: '',
          user_DOB: '',
          user_Gender: '',
          user_EduLevel: '',
          user_PhoneNo: '',
          user_Location: '',
          user_Address: '',
          user_Email: '',
          user_Password: ''
        });
      } else {
        const errorData = await response.json();
        const errorMessages = Object.values(errorData.errors).join(', ');
        console.log('%cError creating user:', 'color: red', errorMessages);
        toast.error('Error creating user');
      }
    } catch (error) {
      console.log('%cError creating user:', 'color: red', error);
      toast.error('Error creating user');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-7">
          <img src={mainlogo} alt="mainlogo" />
        </div>
        <div className="col-lg-5" id="maincontainer">
          <div className="form-container">
            <div id="image1">
              <img src={kaninilogo} alt="kaninilogo" />
            </div>
            <div className="register">
              <h1 style={{ textAlign: 'left' }}>Register</h1>
              <p style={{ paddingBottom: '2%', color: '#626D8A' }}>
                Please fill in the required fields to create an account
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="user_FirstName"
                placeholder="  Enter your first name"
                value={formData.user_FirstName}
                onChange={handleChange}
                required
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="user_LastName"
                placeholder="  Enter your last name"
                value={formData.user_LastName}
                onChange={handleChange}
                required
              />

              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="user_Departmenr"
                value={formData.user_Departmenr}
                onChange={handleChange}
                required
              >
                <option value="">Select your department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>

              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                name="user_Designation"
                placeholder="  Enter your Designation"
                value={formData.user_Designation}
                onChange={handleChange}
                required
              />

              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="user_DOB"
                value={formData.user_DOB}
                onChange={handleChange}
                required
              />

              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="user_Gender"
                value={formData.user_Gender}
                onChange={handleChange}
                required
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="education">Education Level</label>
              <input
                type="text"
                id="education"
                name="user_EduLevel"
                placeholder="  Enter your education level"
                value={formData.user_EduLevel}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="user_Email"
                placeholder="  Enter your email"
                value={formData.user_Email}
                onChange={handleChange}
                required
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="user_PhoneNo"
                placeholder="  Enter your phone number"
                value={formData.user_PhoneNo}
                onChange={handleChange}
                required
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="user_Location"
                placeholder="  Enter your location"
                value={formData.user_Location}
                onChange={handleChange}
                required
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="user_Address"
                placeholder="  Enter your address"
                value={formData.user_Address}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="user_Password"
                placeholder="  Enter your password"
                value={formData.user_Password}
                onChange={handleChange}
                required
              />

              <input
                type="submit"
                value="Register"
                className="button1"
                style={{ color: 'white', fontSize: '18px' }}
              />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
