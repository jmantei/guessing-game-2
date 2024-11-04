import Main from "@/layouts/Main";
import Header from "@/components/Header";

import styles from "./page.module.css";

function page() {
  return (
    <Main>
      <div className={styles.page}>
        <Header text="Create New Game" />
        <form action="">
          <select name="" id="">
            <option value="full">Full Game</option>
          </select>
          <select name="" id="">
            <option value="numOfPlayers">Select Players</option>
          </select>
        </form>
      </div>
    </Main>
  );
}

export default page;
