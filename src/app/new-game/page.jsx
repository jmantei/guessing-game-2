"use client";

import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "./page.module.css";
import { useState } from "react";

function NewGame() {
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  return (
    <Main>
      <div className={styles.page}>
        <Header text="Create New Game" />
        <form className={styles.form} action="">
          <div className={styles.formControl}>
            <select name="gameType" id="gameType" required>
              <option value="">Select Length</option>
              <option value="full">Full Game</option>
              <option value="half">Half Game</option>
            </select>
          </div>
          <div className={styles.formControl}>
            <select name="numPlayers" id="numPlayers" required>
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
          <div className={styles.formControl}>
            <label htmlFor="player 1">Player names:</label>
            <input
              type="text"
              defaultValue="Player 1"
              name="player1"
              id="player1"
            />
            <input
              type="text"
              defaultValue="Player 2"
              name="player2"
              id="player2"
            />
            <input
              type="text"
              defaultValue="Player 3"
              name="player3"
              id="player3"
            />
            <input
              type="text"
              defaultValue="Player 3"
              name="player3"
              id="player3"
            />
            <input
              type="text"
              defaultValue="Player 4"
              name="player4"
              id="player4"
            />
            <input
              type="text"
              defaultValue="Player 5"
              name="player5"
              id="player5"
            />
            <input
              type="text"
              defaultValue="Player 6"
              name="player6"
              id="player6"
            />
            <input
              type="text"
              defaultValue="Player 7"
              name="player7"
              id="player7"
            />
            <input
              type="text"
              defaultValue="Player 8"
              name="player8"
              id="player8"
            />
            <input
              type="text"
              defaultValue="Player 9"
              name="player9"
              id="player9"
            />
            <input
              type="text"
              defaultValue="Player 10"
              name="player10"
              id="player10"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="gameTitle">Game title:</label>
            <input
              type="text"
              placeholder="Game title"
              name="gameTitle"
              id="gameTitle"
            />
          </div>
        </form>
        <Button navlink href="/start-game" text="Start Game" />
        <Button type="secondary" navlink href="/" text="Back to Main Menu" />
      </div>
    </Main>
  );
}

export default NewGame;
