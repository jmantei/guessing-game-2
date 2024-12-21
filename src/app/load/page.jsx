"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LocalStorage from "@/utils/LocalStorage";

import Main from "@/layouts/Main";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

import styles from "./page.module.css";

function Page() {
  // modal states
  const [gameToDelete, setGameToDelete] = useState(null);
  const [deleteAllGames, setDeleteAllGames] = useState(false);
  const [noGamesToDelete, setNoGamesToDelete] = useState(false);

  const router = useRouter();

  const appData = LocalStorage.getAppData();
  let games = [];
  if (appData) games = appData.games.reverse(); // reverse games list to show newest game first

  function handleDeleteGame(game) {
    // delete game
    LocalStorage.removeGameData(game);
    LocalStorage.removeGameTitle(game);

    // reload page
    router.refresh();

    // close modal
    setGameToDelete(null);
  }

  function handleDeleteAllGames() {
    // reset all data
    LocalStorage.reset();

    // reload page
    router.refresh();

    // close modal
    setDeleteAllGames(null);
  }

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
                      onClick={() => setGameToDelete(game)}
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
        <Button
          text="Clear All Saved Games"
          className={styles.deleteAllButton}
          onClick={() => {
            // check if no games have been saved
            if (LocalStorage.getAppData().games.length === 0) {
              setNoGamesToDelete(true);
              return;
            }

            setDeleteAllGames(true);
          }}
        />
      </div>
      {gameToDelete ? (
        <Modal
          buttonText="Delete Game"
          redButton
          paragraphs={[
            `Are you sure you want to delete \"${gameToDelete}\"?`,
            "This action cannot be undone.",
          ]}
          onModalConfirm={() => handleDeleteGame(gameToDelete)}
          onModalClose={() => setGameToDelete(null)}
        />
      ) : null}
      {deleteAllGames ? (
        <Modal
          buttonText="Delete All Games"
          redButton
          paragraphs={[
            `Are you sure you want to delete all your saved games?`,
            "This action cannot be undone.",
          ]}
          onModalConfirm={handleDeleteAllGames}
          onModalClose={() => setDeleteAllGames(false)}
        />
      ) : null}
      {noGamesToDelete ? (
        <Modal
          buttonText="Return to Main Menu"
          confirmNavlink
          paragraphs={[
            "There are no games to delete.",
            'Select "New Game" at the Main Menu to create a game.',
          ]}
          onModalClose={() => setNoGamesToDelete(false)}
        />
      ) : null}
    </Main>
  );
}

export default Page;
