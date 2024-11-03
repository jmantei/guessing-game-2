"use client";
import Link from "next/link";

import styles from "./Button.module.css";

function Button({
  type = "primary",
  navlink = false,
  href = "/",
  text = "click here",
  className = "",
  onclick = () => {
    console.log("Clicked");
  },
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
      onClick={onclick}
    >
      {text}
    </button>
  );
}

export default Button;
