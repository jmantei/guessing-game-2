"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/Footer";
import LocalStorage from "@/utils/LocalStorage";

import styles from "./Main.module.css";

function Main({ children, centered = false, noLocalStorageCheck = false }) {
  const router = useRouter();

  useEffect(() => {
    if (!noLocalStorageCheck) {
      if (!LocalStorage.exists()) {
        router.push("/");
      }
    }
  }, [noLocalStorageCheck, router]);

  return (
    <>
      <main className={`${styles.main} ${centered ? styles.mainCentered : ""}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Main;
