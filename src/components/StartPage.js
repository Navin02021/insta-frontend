import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const StartPage = () => {
  const [targetUsername, setTargetUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!targetUsername.trim()) {
      setError('Please enter a username.');
      return;
    }

    setLoading(true);

    fetch('https://api.fakeidfinder.tech/check_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: targetUsername }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching user data. Please try again.');
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = event => {
    setTargetUsername(event.target.value);
  };

  const handleClear = () => {
    setTargetUsername('');
    setUserData(null);
    setError(null);
  };

  return (
    <div className="instagram-theme">
 <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container">
    <Link className="navbar-brand" to="/"><img src="logo192.png" alt='logo'/>Instagram Fake ID Detector</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/start">search</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


    <div className="container-fluid mt-3 style={{ marginBottom: '400px !important' }}">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded-lg shadow">
          <div className="card-header bg-gradient" style={{ background: 'linear-gradient(to right, #8a3ab9, #bc2a8d)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h5 className="text-white">User Search</h5>
</div>
<div className="card-body">
  <div className="row mb-3">
    <div className="col-md-8 col-sm-12 p-2"> {/* Use col-md-8 for medium and larger screens, and col-sm-12 for smaller screens */}
      <input
        type="text"
        className="form-control"
        placeholder="Enter Username"
        value={targetUsername}
        onChange={handleInputChange}
      />
    </div>
    <div className="col-md-4 col-sm-12 d-flex justify-content-end"> {/* Use col-md-4 for medium and larger screens, and col-sm-12 for smaller screens */}
      <button
        className="btn p-2 m-2"
        type="button"
        onClick={handleSearch}
        style={{ backgroundColor: 'rgba(24, 119, 242, 1)', color: 'rgba(255,255,255,1)' }}
      >
        <i className="fas fa-search me-1"></i> Search
      </button>
      <button
        className="btn p-2 m-2"
        type="button"
        onClick={handleClear}
        style={{ backgroundColor: 'rgba(239, 239, 239, 1)', color: 'rgba(0,0,0,1)' }}
      >
        <i className="fas fa-times me-2"></i> Clear
      </button>
    </div>
  </div>




              {loading && (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary me-2" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              )}
              {error && (
                <p className="text-danger mt-4 animate__animated animate__fadeIn">{error}</p>
              )}
       {userData && (
  <div className="user-data mt-4 animate__animated animate__fadeIn" style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '10px' }}>
    <h3 style={{ color: '#fccc63', marginBottom: '20px' }}>User Data</h3>
    <div className="table-responsive">
      <table className="table table-bordered" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <td><strong>Username </strong></td>
            <td>{userData.profile_data.username}</td>
            <td><strong>Is Fake</strong></td>
            <td className={userData.is_fake ? 'bg-danger' : 'bg-success'} style={{ padding: '10px' }}>
              {userData.is_fake ? 'Yes' : 'No'}
            </td>
          </tr>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <td><strong>Fake percentage <i className="fas fa-percentage    "></i></strong></td>
            <td>
              <div className="d-flex justify-content-center align-items-center fake-percentile">
                <CircularProgressbar
                  value={userData.fake_percentage}
                  text={`${userData.fake_percentage}%`}
                  styles={{
                    path: { stroke: userData.is_fake ? '#ff4c4c' : '#3e98c7' },
                    text: { fill: userData.is_fake ? '#ff4c4c' : '#3e98c7', fontSize: '16px' },
                  }}
                />
              </div>
            </td>
            <td><strong>Profile Picture </strong></td>
            <td style={{ padding: '10px' }}>
              <img
                src={userData.profile_data.profile_pic_data_uri}
                alt="Profile"
                className="img-fluid rounded mb-3"
                style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '50%' }}
              />
            </td>
                        </tr>
                        <tr>
                          <td><strong>Followers</strong></td>
                          <td>{userData.profile_data.followers}</td>
                          <td><strong>Following</strong></td>
                          <td>{userData.profile_data.following}</td>
                        </tr>
                        <tr>
                          <td><strong>Posts</strong></td>
                          <td>{userData.profile_data.posts}</td>
                          <td><strong>Profile</strong></td>
                          <td>{userData.profile_data.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>Bio</strong></td>
                          <td>{userData.profile_data.bio}</td>
                          <td><strong>Full Name</strong></td>
                          <td>{userData.profile_data.full_name}</td>
                        </tr>
                        <tr>
                          <td><strong>Verification Status</strong></td>
                          <td>
                            {userData.profile_data.verification_status === 'Verified' ? (
                              <div>
                                {userData.profile_data.verification_status} <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'blue' }} />
                              </div>
                            ) : userData.profile_data.verification_status}
                          </td>
                          <td><strong>Website</strong></td>
                          <td>{userData.profile_data.website || 'Not Available'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default StartPage;
