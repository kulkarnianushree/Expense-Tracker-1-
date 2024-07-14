import React, { useState, useContext } from "react";
import AuthContext from "../../Store/auth-content";

const Profile = () => {
  const [UserInfo, setUserInfo] = useState({
    Name: '',
    URL: ''
  });
  
  const AuthCtx = useContext(AuthContext);

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
          idToken: AuthCtx.token,
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
      console.log(data); // Log the response data to console upon success
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3>Winners never quit and quitters never win</h3>
        <p>
          Your Profile is 64% completed.
          A complete profile has higher chances of landing a job.
          <button>Complete now</button>
        </p>
      </div>
      <form>
        <div>
          <h2>Contact Details</h2>
          <button>Cancel</button>
        </div>
        <div>
          <label>Full Name</label>
          <input 
            type="text"
            onChange={NameChangeHandler}
          />
        </div>
        <div>
          <label>Profile URL</label>
          <input 
            type="url"
            onChange={URlChangeHandler}
          />
        </div>
        <button type="button" onClick={UpdateButtonHandler}>Update</button>
      </form>
    </div>
  );
};

export default Profile;
