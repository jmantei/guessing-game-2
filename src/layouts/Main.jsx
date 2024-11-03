import Footer from "@/components/Footer";

import styles from "./Main.module.css";

function Main({ children }) {
  return (
    <>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

export default Main;
