import React from 'react';
import './Header.css';

function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}

export default Header;
