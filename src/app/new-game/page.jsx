"use client";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "./page.module.css";
import { useState } from "react";

function NewGame() {
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  function handlePlayerChange(e) {
    setNumOfPlayers(Number(e.target.value));
  }

  return (
    <Main>
      <div className={styles.page}>
        <Header text="Create New Game" />
        <form className={styles.form} action="/start-game">
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
              <option value="9">9</option>
              <option value="10">10</option>
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
              name="gameTitle"
              id="gameTitle"
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
