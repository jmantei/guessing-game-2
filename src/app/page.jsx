import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Guessing Game 2</p>
      </main>
      <footer className={styles.footer}>
        <p>Coded by Josh</p>
      </footer>
    </div>
  );
}
