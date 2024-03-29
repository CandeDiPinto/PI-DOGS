import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Welcome Dog Lovers</h1>
        <Link to="/home">
          <button>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}