import Button from "@/components/Button";
import Main from "@/layouts/Main";

import styles from "./page.module.css";

function Rules() {
  return (
    <Main centered>
      <div className={styles.page}>
        <p className={styles.comingSoon}>Rules Coming Soon...</p>
        <Button navlink href="/" text="Back to Main Menu" />
      </div>
    </Main>
  );
}

export default Rules;
