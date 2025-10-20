import React from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-center text-white py-5">
        <div className="container">
          <div className="icon display-3 mb-3">🎓</div>
          <h1 className="fw-bold mb-3">Welcome to <span>StudyHub</span></h1>
          <p className="lead mb-5">
            Your comprehensive platform for question papers, study resources, and academic excellence
          </p>

          <div className="row justify-content-center">
            <div className="col-md-3 mb-3">
              <h2 className="fw-bold">100+</h2>
              <p>Resources</p>
            </div>
            <div className="col-md-3 mb-3">
              <h2 className="fw-bold">500+</h2>
              <p>Students</p>
            </div>
            <div className="col-md-3 mb-3">
              <h2 className="fw-bold">4.9</h2>
              <p>Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-3">Everything You Need to Succeed</h2>
          <p className="text-muted mb-5">
            Explore our comprehensive collection of study resources, blog posts, and support materials
          </p>

          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <div className="card-icon fs-1 mb-3 text-primary">📄</div>
                <h4 className="fw-semibold mb-2">Question Papers</h4>
                <p className="text-muted mb-3">
                  Access a vast collection of previous year question papers and study materials
                </p>
                <a href="#" className="text-primary fw-semibold text-decoration-none">Explore →</a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <div className="card-icon fs-1 mb-3 text-primary">📘</div>
                <h4 className="fw-semibold mb-2">Study Blog</h4>
                <p className="text-muted mb-3">
                  Read articles, tips, and guides to help you excel in your studies
                </p>
                <a href="#" className="text-primary fw-semibold text-decoration-none">Explore →</a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <div className="card-icon fs-1 mb-3 text-primary">❓</div>
                <h4 className="fw-semibold mb-2">FAQs</h4>
                <p className="text-muted mb-3">
                  Get quick answers to frequently asked questions about our platform
                </p>
                <a href="#" className="text-primary fw-semibold text-decoration-none">Explore →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-3 border-top text-center text-muted">
        © 2025 StudyHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
