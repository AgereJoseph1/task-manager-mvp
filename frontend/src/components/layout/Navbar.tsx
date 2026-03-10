import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/tasks" className="navbar__brand">
          Task Manager
        </Link>
        <nav className="navbar__nav" aria-label="Main navigation">
          <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active' : '')}>
            Tasks
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
