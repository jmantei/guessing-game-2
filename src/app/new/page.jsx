"use client";
import { useRouter } from "next/navigation";

import { validNewGameForm } from "@/utils/Validation";
import LocalStorage from "@/utils/LocalStorage";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

function NewGame() {
  const router = useRouter();
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [formErrorSate, setFormErrorSate] = useState([]);

  function autofillTitle(e) {
    e.preventDefault();
    const inputEl = e.target.previousSibling;

    const date = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${
      months[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    inputEl.value = formattedDate;
  }

  function handlePlayerChange(e) {
    setNumOfPlayers(Number(e.target.value));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // get data from form
    const form = new FormData(e.target);
    const formData = {};
    for (const [key, value] of form) {
      formData[`${key}`] = `${value}`;
    }
    console.log(formData);
    const gameType = formData["game-type"];
    const numPlayers = Number(formData["num-players"]);
    const gameTitle = formData["game-title"].trim();
    const player1Name =
      typeof formData["player-1"] !== "undefined"
        ? formData["player-1"].trim()
        : "";
    const player2Name =
      typeof formData["player-2"] !== "undefined"
        ? formData["player-2"].trim()
        : "";
    const player3Name =
      typeof formData["player-3"] !== "undefined"
        ? formData["player-3"].trim()
        : "";
    const player4Name =
      typeof formData["player-4"] !== "undefined"
        ? formData["player-4"].trim()
        : "";
    const player5Name =
      typeof formData["player-5"] !== "undefined"
        ? formData["player-5"].trim()
        : "";
    const player6Name =
      typeof formData["player-6"] !== "undefined"
        ? formData["player-6"].trim()
        : "";
    const player7Name =
      typeof formData["player-7"] !== "undefined"
        ? formData["player-7"].trim()
        : "";
    const player8Name =
      typeof formData["player-8"] !== "undefined"
        ? formData["player-8"].trim()
        : "";

    // validate form data
    const formErrors = validNewGameForm(
      gameType,
      numPlayers,
      gameTitle,
      player1Name,
      player2Name,
      player3Name,
      player4Name,
      player5Name,
      player6Name,
      player7Name,
      player8Name
    );

    // remove unique player names error if other name errors exists
    if (
      (formErrors.includes("player1Name-none") ||
        formErrors.includes("player2Name-none") ||
        formErrors.includes("player3Name-none") ||
        formErrors.includes("player4Name-none") ||
        formErrors.includes("player5Name-none") ||
        formErrors.includes("player6Name-none") ||
        formErrors.includes("player7Name-none") ||
        formErrors.includes("player8Name-none") ||
        formErrors.includes("player1Name-alphanum") ||
        formErrors.includes("player2Name-alphanum") ||
        formErrors.includes("player3Name-alphanum") ||
        formErrors.includes("player4Name-alphanum") ||
        formErrors.includes("player5Name-alphanum") ||
        formErrors.includes("player6Name-alphanum") ||
        formErrors.includes("player7Name-alphanum") ||
        formErrors.includes("player8Name-alphanum") ||
        formErrors.includes("player1Name-length") ||
        formErrors.includes("player2Name-length") ||
        formErrors.includes("player3Name-length") ||
        formErrors.includes("player4Name-length") ||
        formErrors.includes("player5Name-length") ||
        formErrors.includes("player6Name-length") ||
        formErrors.includes("player7Name-length") ||
        formErrors.includes("player8Name-length")) &&
      formErrors.includes("unique-names")
    )
      formErrors.pop("unique-names");

    // check if game exists
    if (LocalStorage.gameExists(gameTitle)) formErrors.push("game-exists");

    // check if there are errors
    if (formErrors.length !== 0) {
      setFormErrorSate(formErrors);
      console.log(formErrors);
      return;
    }

    // add game to localstorage
    LocalStorage.addGameTitle(gameTitle);
    LocalStorage.addGameData(
      gameTitle,
      gameType,
      numPlayers,
      player1Name,
      player2Name,
      player3Name,
      player4Name,
      player5Name,
      player6Name,
      player7Name,
      player8Name
    );

    // redirect to play game page
    router.push(`/play?game=${gameTitle.replace(/\s+/g, "+")}`);
  }

  return (
    <Main>
      <div className={styles.page}>
        <Header text="Create New Game" />
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.selectControl}>
            <div className={styles.selectSubControl}>
              <select name="game-type" id="game-type">
                <option value="">Select Length</option>
                <option value="full">Full Game</option>
                <option value="half">Half Game</option>
              </select>
              {formErrorSate.includes("type-none") && (
                <p className={styles.setInputError}>Game length is required.</p>
              )}
            </div>
            <div className={styles.selectSubControl}>
              <select
                name="num-players"
                id="num-players"
                onChange={handlePlayerChange}
              >
                <option value="">Select Players</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              {formErrorSate.includes("players-none") && (
                <p className={styles.setInputError}>
                  Number of players is required.
                </p>
              )}
            </div>
          </div>
          <div className={styles.textControl}>
            {numOfPlayers ? (
              <label htmlFor="player-1">Player names:</label>
            ) : null}
            {Array.from(Array(numOfPlayers).keys()).map((n) => (
              <input
                className={
                  formErrorSate.includes(`player${n + 1}Name-none`) ||
                  formErrorSate.includes(`player${n + 1}Name-alphanum`) ||
                  formErrorSate.includes(`player${n + 1}Name-length`) ||
                  formErrorSate.includes(`unique-names`)
                    ? styles.setInputBorderError
                    : ""
                }
                key={n}
                type="text"
                defaultValue={`Player ${n + 1}`}
                name={`player-${n + 1}`}
                id={`player-${n + 1}`}
              />
            ))}
            {(formErrorSate.includes("player1Name-none") ||
              formErrorSate.includes("player2Name-none") ||
              formErrorSate.includes("player3Name-none") ||
              formErrorSate.includes("player4Name-none") ||
              formErrorSate.includes("player5Name-none") ||
              formErrorSate.includes("player6Name-none") ||
              formErrorSate.includes("player7Name-none") ||
              formErrorSate.includes("player8Name-none")) && (
              <p className={styles.setInputError}>
                Player names cannot be empty.
              </p>
            )}
            {(formErrorSate.includes("player1Name-alphanum") ||
              formErrorSate.includes("player2Name-alphanum") ||
              formErrorSate.includes("player3Name-alphanum") ||
              formErrorSate.includes("player4Name-alphanum") ||
              formErrorSate.includes("player5Name-alphanum") ||
              formErrorSate.includes("player6Name-alphanum") ||
              formErrorSate.includes("player7Name-alphanum") ||
              formErrorSate.includes("player8Name-alphanum")) && (
              <p className={styles.setInputError}>
                Player names can only contain letters and numbers.
              </p>
            )}
            {(formErrorSate.includes("player1Name-length") ||
              formErrorSate.includes("player2Name-length") ||
              formErrorSate.includes("player3Name-length") ||
              formErrorSate.includes("player4Name-length") ||
              formErrorSate.includes("player5Name-length") ||
              formErrorSate.includes("player6Name-length") ||
              formErrorSate.includes("player7Name-length") ||
              formErrorSate.includes("player8Name-length")) && (
              <p className={styles.setInputError}>
                Player names can only contain a maximum of 25 characters.
              </p>
            )}
            {formErrorSate.includes("unique-names") && (
              <p className={styles.setInputError}>
                Player names must be unique.
              </p>
            )}
          </div>
          <div className={styles.textControl}>
            <label htmlFor="game-title">Game title:</label>
            <input
              className={`${
                formErrorSate.includes("title-none") ||
                formErrorSate.includes("title-alphanum") ||
                formErrorSate.includes("title-length") ||
                formErrorSate.includes("game-exists")
                  ? styles.setInputBorderError
                  : ""
              } ${styles.gameTitleInput}`}
              type="text"
              placeholder="Game title..."
              name="game-title"
              id="game-title"
            />
            <Button
              text="Autofill"
              className={styles.autofillButton}
              onClick={autofillTitle}
            />

            {formErrorSate.includes("title-none") && (
              <p className={styles.setInputError}>Game title is required.</p>
            )}
            {formErrorSate.includes("title-alphanum") && (
              <p className={styles.setInputError}>
                Game title can only contain letters and numbers.
              </p>
            )}
            {formErrorSate.includes("title-length") && (
              <p className={styles.setInputError}>
                Game title can only contain a maximum of 25 characters.
              </p>
            )}
            {formErrorSate.includes("game-exists") && (
              <p className={styles.setInputError}>Game already exists.</p>
            )}
          </div>
          <Button
            buttonType="submit"
            text="Start Game"
            className={styles.startButton}
          />
          <Button type="secondary" navlink href="/" text="Back to Main Menu" />
        </form>
      </div>
    </Main>
  );
}

export default NewGame;
