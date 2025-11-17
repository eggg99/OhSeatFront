import React, { useEffect } from "react";
import styles from "@/styles/css/module/LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  return (
    <div className={styles.spinner_back}>
      <div
        className={styles.spinner}
      />
      <div className={styles.text}>로딩중입니다.</div>
    </div>
  );
};

export default LoadingSpinner;