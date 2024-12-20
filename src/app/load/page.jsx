"use client";

import LocalStorage from "@/utils/LocalStorage";

import Main from "@/layouts/Main";
import Button from "@/components/Button";

import styles from "./page.module.css";

function Page() {
  const appData = LocalStorage.getAppData();
  let games = [];
  if (appData) games = appData.games;

  return (
    <Main>
      <div className={styles.page}>
        {games.length ? (
          <>
            <h2>Saved Games:</h2>
            <ul className={styles.gameList}>
              {games.map((game) => (
                <li key={game} className={styles.gameListItem}>
                  <p>{game}</p>
                  <div className={styles.buttonContainer}>
                    <Button
                      text="Load"
                      navlink
                      href={`/play?game=${game.replace(/ /g, "+")}`}
                      className={styles.loadButton}
                    />
                    <Button
                      text="Delete"
                      navlink
                      href={`/play?game=${game.replace(/ /g, "+")}`}
                      className={styles.deleteButton}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2>No games found</h2>
        )}
        <Button type="secondary" text="Back to Main Menu" navlink href="/" />
        <Button text="Clear All Saved Games" />
      </div>
    </Main>
  );
}

export default Page;
