"use client";

import styles from "./IconButton.module.css";

function IconButton({
  children,
  className = "",
  onClick = () => {
    console.log("Clicked");
  },
  type = "primary",
}) {
  return (
    <button
      className={`${styles.primary} ${
        type === "secondary" ? styles.secondary : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
