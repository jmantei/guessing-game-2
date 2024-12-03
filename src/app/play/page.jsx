"use client";

import { useSearchParams, redirect } from "next/navigation";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useState } from "react";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";
import RoundInfo from "@/components/RoundInfo";
import SetsInput from "@/components/SetsInput";
import ExitModal from "@/components/ExitModal";

import LocalStorage from "@/utils/LocalStorage";
import styles from "./page.module.css";

function Page() {
  // modal state for returning to main menu
  const [exitModalOpen, setExitModalOpen] = useState(false);

  const searchParams = useSearchParams();

  // get game title from url
  const gameUrl = searchParams.get("game");
  const gameTitle = gameUrl.replace(/\+/g, " ");

  // if game doesnt exist
  if (!LocalStorage.gameExists(gameTitle)) redirect("/");

  // get game data
  const gameData = LocalStorage.getGameData(gameTitle);
  console.log(gameData);

  // sync the gameState on the page to the gameData in local storage
  const [gameState, setGameState] = useLocalStorageState(
    `game - ${gameTitle}`,
    gameData
  );

  // set number of columns based on gameType
  let tablecols;
  switch (gameState.type) {
    case "full":
      tablecols = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
    case "half":
      tablecols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
    default:
      tablecols = 0;
  }

  return (
    <Main>
      <div className={styles.page}>
        <Header text={gameTitle} />
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* Display table column headers */}
                {Array.from({ length: tablecols.length + 1 }, (_, i) => (
                  <th key={i} data-cell={i == 0 ? "name" : `round-${i}`}>
                    {i == 0 ? "Round" : tablecols[i - 1]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Display table body rows */}
              {Array.from({ length: gameState.numberOfPlayer }, (_, i) => (
                <tr key={`row-${i + 1}`}>
                  {/* Display table cells */}
                  {Array.from({ length: tablecols.length + 1 }, (_, j) => (
                    <td key={j} data-cell={j == 0 ? "name" : `round-${j}`}>
                      {j == 0 ? (
                        gameState.playerNames[i]
                      ) : (
                        <div className={styles.cellContainer}>
                          <span>0</span>
                          <span>1</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Game Ended */}
        {gameState.round > tablecols.length ? (
          <>
            <h2>🎉 Congratulations to the Winner 🎉</h2>
            <h2>Player 1 with 25 points</h2>
            <Button text="Back to Main Menu" navlink href="/" />
          </>
        ) : (
          <>
            {/* round start */}
            {gameState.state == "start-round" ? (
              <Button
                text={
                  !gameState.round
                    ? "Start First Round"
                    : gameState.round === tablecols.length - 1
                    ? "Start Last Round"
                    : gameState.round === tablecols.length
                    ? "Finish Game"
                    : "Start Next Round"
                }
                onClick={() =>
                  setGameState((prev) => ({
                    ...prev,
                    state: "guesses",
                    round: prev.round++,
                  }))
                }
              />
            ) : null}
            {/* submit guesses */}
            {gameState.state == "guesses" ? (
              <>
                <RoundInfo
                  round={gameState.round}
                  cards={tablecols[gameState.round - 1]}
                />
                <div className={styles.inputBox}>
                  {Array.from(Array(gameState.numberOfPlayer).keys()).map(
                    (n) => (
                      <SetsInput
                        key={n}
                        playerName={gameState.playerNames[n]}
                        guessOnly
                      />
                    )
                  )}
                </div>
                <Button
                  text="Submit Guesses"
                  onClick={() =>
                    setGameState((prev) => ({
                      ...prev,
                      state: "sets-won",
                      // logic for saving guesses goes here
                    }))
                  }
                />
              </>
            ) : null}
            {/* submit sets won */}
            {gameState.state == "sets-won" ? (
              <>
                <RoundInfo
                  round={gameState.round}
                  cards={tablecols[gameState.round - 1]}
                />
                <div className={styles.inputBox}>
                  {Array.from(Array(gameState.numberOfPlayer).keys()).map(
                    (n) => (
                      <SetsInput
                        key={n}
                        playerName={gameState.playerNames[n]}
                      />
                    )
                  )}
                </div>
                <Button
                  text="Submit Sets Won"
                  onClick={() =>
                    setGameState((prev) => ({
                      ...prev,
                      state: "start-round",
                      // logic for saving sets won goes here
                    }))
                  }
                />
              </>
            ) : null}
            <Button
              type="secondary"
              text="Save and Exit"
              onClick={() => {
                setExitModalOpen(true);
              }}
            />
          </>
        )}
      </div>
      {exitModalOpen ? (
        <ExitModal onModalClose={() => setExitModalOpen(false)} />
      ) : null}
    </Main>
  );
}

export default Page;
