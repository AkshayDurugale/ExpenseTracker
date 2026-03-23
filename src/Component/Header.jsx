import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Personal Finance Tracker</h1>
        </header>

        <div>
          <nav className={styles.nav}>
            <button
              className={styles.hamburger}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>

            <div
              className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ""}`}
            >
              <Link to="/" className={styles.navLink} onClick={closeMenu}>
                Add Transaction
              </Link>
              <Link to="/charts" className={styles.navLink} onClick={closeMenu}>
                Charts
              </Link>
              <Link
                to="/transactions"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Transaction List
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
