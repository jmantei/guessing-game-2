"use client";

import { useSearchParams, redirect } from "next/navigation";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useState } from "react";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";
import RoundInfo from "@/components/RoundInfo";
import SetsInput from "@/components/SetsInput";
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
import FullscreenCloseIcon from "@/components/FullscreenCloseIcon";
import FlipVerticalIcon from "@/components/FlipVerticalIcon";

import LocalStorage from "@/utils/LocalStorage";
import { validateSetInput } from "@/utils/Validation";
import {
  JoinWithAnd,
  GenerateShiftedPlayerArray,
  UnshiftPlayerArray,
} from "@/utils/Utilities";
import {
  CalculateMaxScore,
  CalculateScore,
  CalculateWinner,
} from "@/utils/GameLogic";

import styles from "./page.module.css";

function Page() {
  // modal state for returning to main menu
  const [exitModalOpen, setExitModalOpen] = useState(false);
  // fullscreen round display
  const [roundDisplayOpen, setRoundDisplayOpen] = useState(false);
  // initialize input error array
  const [setInputErrors, setSetInputErrors] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const validInputs = setInputErrors.join("").length === 0;

  const searchParams = useSearchParams();

  // get game title from url
  const gameUrl = searchParams.get("game") || "";
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

  // set player number array for displaying the guess input boxes
  const playerNumberArray = GenerateShiftedPlayerArray(
    gameState.numberOfPlayer,
    gameState.startingPlayerIndex
  );

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
                    {i == 0 ? "Cards" : tablecols[i - 1]}
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
                          <span>
                            {gameState.game.guesses[`player${i + 1}`][j - 1]}
                          </span>
                          <span>
                            {gameState.game.points[`player${i + 1}`][j - 1]}
                          </span>
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
        {gameState.state == "finished" ? (
          <>
            <div className={styles.endOfGameBox}>
              <h2>{`🎉 Congratulations to the Winner${
                CalculateWinner(gameState.game.points, gameState.playerNames)
                  .length > 1
                  ? "s"
                  : ""
              } 🎉`}</h2>
              <h2>
                {JoinWithAnd(
                  CalculateWinner(gameState.game.points, gameState.playerNames)
                )}{" "}
                with a score of {CalculateMaxScore(gameState.game.points)}
              </h2>
            </div>
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
                onClick={() => {
                  // check if it is the final round
                  if (gameState.round === tablecols.length) {
                    setGameState((prev) => ({
                      ...prev,
                      state: "finished",
                    }));
                  } else {
                    setGameState((prev) => ({
                      ...prev,
                      state: "guesses",
                      round: ++prev.round,
                      startingPlayerIndex:
                        prev.startingPlayerIndex < prev.numberOfPlayer - 1
                          ? ++prev.startingPlayerIndex
                          : 0,
                    }));
                  }
                }}
              />
            ) : null}
            {/* submit guesses */}
            {gameState.state == "guesses" ? (
              <>
                <RoundInfo
                  round={gameState.round}
                  cards={tablecols[gameState.round - 1]}
                  playerNames={gameState.playerNames}
                  numberOfPlayers={gameState.numberOfPlayer}
                  playerGuessingFirstIndex={gameState.startingPlayerIndex}
                  guessesFirst
                  setRoundDisplayOpen={setRoundDisplayOpen}
                />
                <div className={styles.inputBox}>
                  {playerNumberArray.map((n) => (
                    <SetsInput
                      key={n}
                      playerNumber={n + 1}
                      playerName={gameState.playerNames[n]}
                      showError={setInputErrors[n] !== ""}
                      guessOnly
                    />
                  ))}
                </div>
                {/* error output */}
                <p className={styles.setInputError}>
                  {validInputs
                    ? ""
                    : setInputErrors.includes("not-adding-up")
                    ? "Sets won have to match the amount of cards."
                    : "All inputs have to be valid numbers."}
                </p>
                <Button
                  text="Submit Guesses"
                  onClick={(e) => {
                    // get player guesses
                    const playerGuesses = [];
                    // order inputs
                    const inputContainers = UnshiftPlayerArray(
                      e.target.previousSibling.previousSibling.childNodes,
                      gameState.startingPlayerIndex
                    );
                    console.log("guesses: ", inputContainers);
                    inputContainers.forEach((inputElement) => {
                      playerGuesses.push(
                        inputElement.childNodes[1].value.trim()
                      );
                    });
                    console.log(playerGuesses);

                    // validate player guesses
                    const validationArray = validateSetInput(
                      false,
                      0,
                      ...playerGuesses
                    );
                    console.log(validationArray);

                    // update errors on page state
                    setSetInputErrors(validationArray);

                    // submit guesses if inputs are valid
                    if (validationArray.join("").length === 0) {
                      // create new game state
                      const newGameData = gameState.game;
                      for (let i = 0; i < playerGuesses.length; i++) {
                        // add guesses
                        newGameData.guesses[`player${i + 1}`].push(
                          Number(playerGuesses[i])
                        );
                      }

                      // save new game state
                      setGameState((prev) => ({
                        ...prev,
                        state: "sets-won",
                        game: newGameData,
                      }));
                    }
                  }}
                />
              </>
            ) : null}
            {/* submit sets won */}
            {gameState.state == "sets-won" ? (
              <>
                <RoundInfo
                  round={gameState.round}
                  cards={tablecols[gameState.round - 1]}
                  playerNames={gameState.playerNames}
                  numberOfPlayers={gameState.numberOfPlayer}
                  playerGuessingFirstIndex={gameState.startingPlayerIndex}
                  startsRound
                  playerGuesses={gameState.game.guesses}
                  setRoundDisplayOpen={setRoundDisplayOpen}
                />
                <div className={styles.inputBox}>
                  {playerNumberArray.map((n) => (
                    <SetsInput
                      key={n}
                      playerNumber={n + 1}
                      playerName={gameState.playerNames[n]}
                      showError={setInputErrors[n] !== ""}
                      guessAmount={
                        gameState.game.guesses[`player${n + 1}`][
                          gameState.round - 1
                        ]
                      }
                    />
                  ))}
                </div>
                {/* error output */}
                <p className={styles.setInputError}>
                  {validInputs
                    ? ""
                    : setInputErrors.includes("not-adding-up")
                    ? "Sets won have to match the amount of cards."
                    : "All inputs have to be valid numbers."}
                </p>
                <Button
                  text="Submit Sets Won"
                  onClick={(e) => {
                    // get player sets won
                    const playerSetsWon = [];
                    // order inputs
                    const inputContainers = UnshiftPlayerArray(
                      e.target.previousSibling.previousSibling.childNodes,
                      gameState.startingPlayerIndex
                    );
                    console.log("sets-won: ", inputContainers);
                    inputContainers.forEach((inputElement) => {
                      playerSetsWon.push(
                        inputElement.childNodes[1].value.trim()
                      );
                    });
                    console.log(playerSetsWon);

                    // validate player sets won
                    const validationArray = validateSetInput(
                      true,
                      Number(tablecols[gameState.round - 1]),
                      ...playerSetsWon
                    );
                    console.log(validationArray);

                    // update errors on page state
                    setSetInputErrors(validationArray);

                    // submit sets won if inputs are valid
                    if (validationArray.join("").length === 0) {
                      // create new game state
                      const newGameData = gameState.game;
                      for (let i = 0; i < playerSetsWon.length; i++) {
                        // add sets won
                        newGameData.setsWon[`player${i + 1}`].push(
                          Number(playerSetsWon[i])
                        );
                        // add points
                        console.log(
                          "guess: ",
                          newGameData.guesses[`player${i + 1}`][
                            newGameData.guesses[`player${i + 1}`].length - 1
                          ]
                        );
                        console.log("setswon: ", playerSetsWon[i]);
                        newGameData.points[`player${i + 1}`].push(
                          CalculateScore(
                            Number(
                              newGameData.guesses[`player${i + 1}`][
                                newGameData.guesses[`player${i + 1}`].length - 1
                              ]
                            ),
                            Number(playerSetsWon[i])
                          ) +
                            (newGameData.points[`player${i + 1}`].length === 0
                              ? 0
                              : newGameData.points[`player${i + 1}`][
                                  newGameData.points[`player${i + 1}`].length -
                                    1
                                ])
                        );
                      }

                      // save new game state
                      setGameState((prev) => ({
                        ...prev,
                        state: "start-round",
                        game: newGameData,
                      }));
                    }
                  }}
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
        <Modal
          buttonText="Return to Main Menu"
          confirmNavlink
          paragraphs={[
            "Are you sure you want to quit this game and return to the main menu?",
            "Your progress will be automatically saved.",
          ]}
          onModalClose={() => setExitModalOpen(false)}
        />
      ) : null}

      {roundDisplayOpen && (
        <div className={styles.roundDisplay}>
          {gameState.state == "sets-won" ? (
            <RoundInfo
              round={gameState.round}
              cards={tablecols[gameState.round - 1]}
              playerNames={gameState.playerNames}
              numberOfPlayers={gameState.numberOfPlayer}
              playerGuessingFirstIndex={gameState.startingPlayerIndex}
              startsRound
              playerGuesses={gameState.game.guesses}
              fullscreen
            />
          ) : (
            <RoundInfo
              round={gameState.round}
              cards={tablecols[gameState.round - 1]}
              playerNames={gameState.playerNames}
              numberOfPlayers={gameState.numberOfPlayer}
              playerGuessingFirstIndex={gameState.startingPlayerIndex}
              guessesFirst
              fullscreen
            />
          )}
          <div className={styles.fullscreenButtonContainer}>
            <IconButton onClick={() => setRoundDisplayOpen(false)}>
              <FullscreenCloseIcon />
            </IconButton>
            <IconButton
              type="secondary"
              onClick={() => {
                console.log("flip");
              }}
            >
              <FlipVerticalIcon />
            </IconButton>
          </div>
        </div>
      )}
    </Main>
  );
}

export default Page;
