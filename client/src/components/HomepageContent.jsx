import React from "react";

function HomepageContent() {
  const containerStyle = {
    backgroundImage: 'url("Images/graph (2).png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div style={containerStyle} className="container-fluid homepage-text">
      <div>
        <h1 className="home-heading">Code, Compete, Conquer</h1>
      </div>
      <div className="home-paragraph">
        <p>
          Welcome to our Online Judge Platform, your gateway to coding
          excellence. Whether you're a beginner or a coding pro, our platform
          offers challenging problems and a supportive community to help you
          sharpen your skills. Join the competition, solve, and rise to the top.
          Your coding journey starts now.
        </p>
      </div>
      <a href="/register" className="btn btn-outline-secondary">Sign Up</a>
    </div>
  );
}

export default HomepageContent;