import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState({
    Name: '',
    URL: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A', {
          method: 'POST',
          body: JSON.stringify({
            idToken: token
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const user = data.users[0];

        setUserInfo({
          Name: user.displayName || '',
          URL: user.photoUrl || ''
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [token]);

  const NameChangeHandler = (event) => {
    setUserInfo((PrevUserInfo) => ({
      ...PrevUserInfo,
      Name: event.target.value
    }));
  };

  const URlChangeHandler = (event) => {
    setUserInfo((PrevUserInfo) => ({
      ...PrevUserInfo,
      URL: event.target.value
    }));
  };

  const UpdateButtonHandler = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          displayName: UserInfo.Name,
          photoURL: UserInfo.URL,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const CancelButtonHandler = () => {
    navigate('/welcome');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="info">
          <h3>Winners never quit and quitters never win</h3>
          <p>
            Your Profile is 64% completed.
            A complete profile has higher chances of landing a job.
            <button className="complete-now-button">Complete now</button>
          </p>
        </div>
      </div>
      <div className="contact-section">
        <h2>Contact Details</h2>
        <form>
          <div>
            <button type="button" className="cancel-button" onClick={CancelButtonHandler}>Cancel</button>
          </div>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              onChange={NameChangeHandler}
              value={UserInfo.Name}
            />
          </div>
          <div>
            <label>Profile URL</label>
            <input
              type="url"
              onChange={URlChangeHandler}
              value={UserInfo.URL}
            />
          </div>
          <button type="button" className="update-button" onClick={UpdateButtonHandler}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
