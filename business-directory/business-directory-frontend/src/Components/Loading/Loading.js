// Loading.js
import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;
