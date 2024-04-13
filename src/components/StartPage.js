import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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

    fetch('http://192.168.54.112:5000/analyze_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ target_username: targetUsername }),
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
    <div className="container-fluid mt-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded-lg shadow">
            <div className="card-header bg-gradient" style={{ background: 'linear-gradient(to right, #8a3ab9, #bc2a8d)' }}>
              <h5 className="text-white">User Search</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter target_username"
                  value={targetUsername}
                  onChange={handleInputChange}
                />
              </div>
              <div className="btn-group" role="group">
                <button className="btn p-1" type="button" onClick={handleSearch} style={{ backgroundColor: 'rgba(24, 119, 242, 1)', color: 'rgba(255,255,255,1)' }}>
                  Search
                </button>
                <button className="btn " type="button" onClick={handleClear} style={{ backgroundColor: 'rgba(239, 239, 239, 1)', color: 'rgba(0,0,0,1)' }}>
                  Clear
                </button>
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
                <div className="user-data mt-4 animate__animated animate__fadeIn">
                  <h3 style={{ color: '#fccc63' }}>User Data</h3>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td><strong>Username</strong></td>
                          <td>{userData.profile_data.username}</td>
                          <td><strong>Is Fake</strong></td>
                          <td className={userData.is_fake ? 'bg-danger' : 'bg-success'}>
                            {userData.is_fake ? 'Yes' : 'No'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Fake Percentile</strong></td>
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
                          <td><strong>Profile Picture</strong></td>
                          <td>
                            <img
                              src={userData.profile_data.profile_pic_data_uri}
                              alt="Profile"
                              className="img-fluid rounded mb-3"
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
  );
}

export default StartPage;
