"use client";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "./page.module.css";
import { useState } from "react";

function NewGame() {
  const [numOfPlayers, setNumOfPlayers] = useState(0);

  function handlePlayerChange(e) {
    setNumOfPlayers(Number(e.target.value));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // get data from form
    const formData = new FormData(e.target);
    const gameType = formData["game-type"];
    const numPlayers = formData["num-players"];
    const gameTitle = formData["game-title"];
    const player1Name = formData["player-1"];
    const player2Name = formData["player-2"];
    const player3Name = formData["player-3"];
    const player4Name = formData["player-4"];
    const player5Name = formData["player-5"];
    const player6Name = formData["player-6"];
    const player7Name = formData["player-7"];
    const player8Name = formData["player-8"];

    // validate form data

    // save form data

    // redirect to play game page

    console.log(formData);
  }

  return (
    <Main>
      <div className={styles.page}>
        <Header text="Create New Game" />
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.selectControl}>
            <select name="game-type" id="game-type" required>
              <option value="">Select Length</option>
              <option value="full">Full Game</option>
              <option value="half">Half Game</option>
            </select>
            <select
              name="num-players"
              id="num-players"
              required
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
              required
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
