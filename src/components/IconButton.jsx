"use client";

import styles from "./IconButton.module.css";

function IconButton({
  children,
  className = "",
  onClick = () => {
    console.log("Clicked");
  },
}) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
