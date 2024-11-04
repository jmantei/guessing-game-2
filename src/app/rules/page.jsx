import Button from "@/components/Button";
import Main from "@/layouts/Main";
import Header from "@/components/Header";

import styles from "./page.module.css";

function Rules() {
  return (
    <Main centered>
      <div className={styles.page}>
        <Header text="Rules Coming Soon..." />
        <Button navlink href="/" text="Back to Main Menu" />
      </div>
    </Main>
  );
}

export default Rules;
