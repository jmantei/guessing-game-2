import Footer from "@/components/Footer";

import styles from "./Main.module.css";

function Main({ children, centered = false }) {
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
