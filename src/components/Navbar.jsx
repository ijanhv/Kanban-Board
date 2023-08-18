import React from "react";
import DropDown from "./DropDown"; // Import the DropDown component
import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <DropDown />
      </div>
    </div>
  );
};

export default Navbar;
