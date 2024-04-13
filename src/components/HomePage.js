import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="instagram-theme">
     <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/"><img src="logo192.png" alt='logo'/>Instagram Fake ID Detector</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/start">Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

      <div className="jumbotron jumbotron-fluid text-center" style={{ background: '#007bff', color: '#fff', paddingTop: '80px', paddingBottom: '80px' }}>
  <div className="container">
    <h1 className="display-4">Instagram Fake ID Detector</h1>
    <p className="lead">Detect fake Instagram profiles with ease!</p>
    <Link to="/start" className="btn btn-primary btn-lg animated-button" style={{ backgroundColor: '#FF5252', borderColor: '#FF5252', boxShadow: 'none', fontWeight: 'bold' }}>Get Started</Link>
  </div>
</div>




      <div className="container text-center feature-box-container">
        <h2>Key Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-box" style={{ backgroundColor: '#E1BEE7', color: '#000000', padding: '30px', borderRadius: '10px' }}>
              <i className="fas fa-search fa-3x mb-3" style={{ color: '#673AB7' }}></i>
              <h4>Profile Search</h4>
              <p>Search and analyze Instagram profiles.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box" style={{ backgroundColor: '#B2DFDB', color: '#000000', padding: '30px', borderRadius: '10px' }}>
              <i className="fas fa-users fa-3x mb-3" style={{ color: '#009688' }}></i>
              <h4>User Verification</h4>
              <p>Verify the authenticity of Instagram users.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box" style={{ backgroundColor: '#F0E4C5', color: '#000000', padding: '30px', borderRadius: '10px' }}>
              <i className="fas fa-shield-alt fa-3x mb-3" style={{ color: '#FFC107' }}></i>
              <h4>Fraud Detection</h4>
              <p>Detect fraudulent activity and fake accounts.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ backgroundColor: '#333', color: '#fff', paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <p className="text-center">© 2024 Instagram Fake ID Detector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
