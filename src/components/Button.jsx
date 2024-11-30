"use client";
import Link from "next/link";

import styles from "./Button.module.css";

function Button({
  type = "primary",
  navlink = false,
  href = "/",
  text = "click here",
  className = "",
  onClick = () => {
    console.log("Clicked");
  },
  buttonType = "",
}) {
  return navlink ? (
    <Link
      className={`${styles.primary} ${
        type === "secondary" ? styles.secondary : ""
      } ${className}`}
      href={href}
    >
      {text}
    </Link>
  ) : (
    <button
      className={`${styles.primary} ${
        type === "secondary" ? styles.secondary : ""
      } ${className}`}
      onClick={onClick}
      type={buttonType}
    >
      {text}
    </button>
  );
}

export default Button;
