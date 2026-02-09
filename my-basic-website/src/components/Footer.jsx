import React from 'react';
import './Footer.css';

function Footer({ year, company, email }) {
  return (
    <footer className="footer">
      <p>&copy; {year} {company}. All rights reserved.</p>
      {email && <p className="footer-email">Contact: {email}</p>}
    </footer>
  );
}

export default Footer;
