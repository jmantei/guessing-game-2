"use client";
import { useState } from "react";
import Image from "next/image";

import LocalStorage from "@/utils/LocalStorage";
import Logo from "@/images/logo.png";
import Button from "@/components/Button";
import Main from "@/layouts/Main";

import styles from "./page.module.css";

export default function Home() {
  const [localStorageExists, _] = useState(LocalStorage.exists());
  if (localStorageExists) {
    LocalStorage.init();
  }

  return (
    <Main centered noLocalStorageCheck>
      <div className={styles.page}>
        {localStorageExists ? (
          <>
            <Image
              src={Logo}
              alt="Guessing Game Logo"
              className={styles.logo}
            />
            <div className={styles.buttonContainer}>
              <Button navlink href="/new-game" text="New Game" />
              <Button navlink href="/load-game" text="Load Game" />
              <Button type="secondary" navlink href="/rules" text="Rules" />
            </div>
          </>
        ) : (
          <div className={styles.errorMessageContainer}>
            <p style={{ fontWeight: "bold" }}>
              Oops! We Can&apos;t Access Your Local Storage
            </p>
            <p>
              It looks like your browser is blocking access to local storage,
              which is needed for some features to work properly. Please check
              your browser settings to ensure that cookies and local storage are
              enabled.
            </p>
            <p>
              If you&apos;re using a private/incognito window, try switching to
              a regular browsing session. You may also need to clear your
              browser&apos;s cache or disable any extensions that might be
              interfering.
            </p>
            <p>Thank you for your understanding!</p>
          </div>
        )}
      </div>
    </Main>
  );
}
