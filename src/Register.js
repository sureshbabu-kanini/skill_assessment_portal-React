import React, { useState } from 'react';
import './Register.css';
import mainlogo from './assets/SignInImages/mainlogo.svg';
import kaninilogo from './assets/SignInImages/kanini logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const initialFormData = {
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
    user_Password: '',
    user_Image: null // Will be set to the image file selected by the user
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      user_Image: imageFile
    });
  };

  const createUser = async () => {
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }

      // Save the user data along with the image file to the API
      const response = await fetch('https://localhost:7198/api/Users', {
        method: 'POST',
        body: formDataWithImage
      });

      if (response.ok) {
        console.log('User created successfully.');
        toast.success('User registered successfully');
        setFormData(initialFormData);
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
              <label htmlFor="UserfirstName">First Name</label>
              <input
                type="text"
                id="UserfirstName"
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

              <label htmlFor="Userdepartment">Department</label>
              <select
                id="Userdepartment"
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

              <label htmlFor="genderName">Gender</label>
              <select
                id="genderName"
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

              <label htmlFor="Useremail">Email</label>
              <input
                type="email"
                id="Useremail"
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

              <label htmlFor="Userlocation">Location</label>
              <input
                type="text"
                id="Userlocation"
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

              <label htmlFor="userImage">Profile Image</label>
              <input
                type="file"
                id="userImage"
                name="user_Image"
                accept="image/*"
                onChange={handleImageChange}
              />

              <input
                type="submitNew"
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
