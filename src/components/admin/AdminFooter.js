import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto py-3 border-top">
      <div className="container">
        <span className="text-muted">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
