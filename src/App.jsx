import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState('white');

  const fetchRandomUser = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const randomUser = response.data.users[Math.floor(Math.random() * response.data.users.length)];
      setUserData(randomUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBgColor(color);
  };

  useEffect(() => {
    fetchRandomUser();
    generateRandomColor();
  }, []);

  const handleRefresh = () => {
    fetchRandomUser();
    generateRandomColor();
  };

  return (
    <div className='main'>
      <h1>Random User Generator</h1>
      <div style={{ backgroundColor: bgColor }} className='cover'>
        {userData ? (
          <div className='inner'>
            <div>
              <img src={userData.image} alt="" className='avatar' /> <br />
              {userData.firstName} {userData.lastName}<br />
              {userData.gender} <br />
              <div className='gri'>
                <strong>DOB:</strong> {userData.birthDate}<br />
                <strong>Age:</strong> {userData.age}<br />
                <strong>Weight:</strong> {userData.weight}<br />
                <strong>Height:</strong> {userData.height}<br />
                <div>
                  <button onClick={handleRefresh} className='btn'>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='elemet'><strong className='rigthitems'>Home Address:</strong> {userData.address.address}<br /></div>
              <div className='elemet'><strong className='rigthitems'>Phone number:</strong> {userData.phone}<br /></div>
              <div className='elemet'><strong className='rigthitems'>Company:</strong> {userData.company.title}<br /></div>
              <div className='elemet'><strong className='rigthitems'>Email:</strong> {userData.email}<br /></div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
