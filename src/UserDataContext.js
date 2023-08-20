import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userDataNew, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:7198/api/Users')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <UserDataContext.Provider value={userDataNew}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
