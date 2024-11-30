"use client";

import { useSearchParams, redirect } from "next/navigation";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import LocalStorage from "@/utils/LocalStorage";
import styles from "./page.module.css";

function Page() {
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
        {/* round start */}
        {gameState.state == "round-start" ? (
          <Button
            text="Advance to Next Round"
            onclick={() =>
              setGameState((prev) => ({
                ...prev,
                state: "guesses",
                round: ++prev.round,
              }))
            }
          />
        ) : null}
        {/* guesses */}
        {gameState.state == "guesses" ? <p>Guesses</p> : null}
        <Button type="secondary" text="Save and Exit" navlink href="/" />
      </div>
    </Main>
  );
}

export default Page;
