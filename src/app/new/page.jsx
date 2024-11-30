"use client";
import { useRouter } from "next/navigation";

import { validNewGameForm } from "@/utils/Validation";
import LocalStorage from "@/utils/LocalStorage";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "./page.module.css";
import { useState } from "react";

function NewGame() {
  const router = useRouter();
  const [numOfPlayers, setNumOfPlayers] = useState(0);

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
    if (formErrors.length == 0) {
      // if no errors, check if game exists
      if (LocalStorage.gameExists(gameTitle)) {
        // game title already exists
        console.log("game title already exists");
      } else {
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
    } else {
      // form data invalid
      console.log("INVALID");
      console.log(formErrors);
    }

    // save form data

    // redirect to play game page
  }

  return (
    <Main>
      <div className={styles.page}>
        <Header text="Create New Game" />
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.selectControl}>
            <select name="game-type" id="game-type">
              <option value="">Select Length</option>
              <option value="full">Full Game</option>
              <option value="half">Half Game</option>
            </select>
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
          </div>
          <div className={styles.textControl}>
            {numOfPlayers ? (
              <label htmlFor="player-1">Player names:</label>
            ) : null}
            {Array.from(Array(numOfPlayers).keys()).map((n) => (
              <input
                key={n}
                type="text"
                defaultValue={`Player ${n + 1}`}
                name={`player-${n + 1}`}
                id={`player-${n + 1}`}
              />
            ))}
          </div>
          <div className={styles.textControl}>
            <label htmlFor="game-title">Game title:</label>
            <input
              type="text"
              placeholder="Game title..."
              name="game-title"
              id="game-title"
            />
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
