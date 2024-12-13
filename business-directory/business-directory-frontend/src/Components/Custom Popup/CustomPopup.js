// CustomPopup.js
import React from "react";
import styles from "./CustomPopup.module.css"; // Create your CSS file for styles

const CustomPopup = ({ isOpen, onClose, phone, onCall, onCopy }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3>Call {phone} or Copy?</h3>
        <div className={styles.buttonContainer}>
          <button
            className={styles.callButton}
            onClick={() => {
              onCall();
              onClose();
            }}
          >
            Call
          </button>
          <button
            className={styles.copyButton}
            onClick={() => {
              onCopy();
              onClose();
            }}
          >
            Copy
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
