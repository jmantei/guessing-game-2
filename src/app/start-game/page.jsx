"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";

import Main from "@/layouts/Main";

import styles from "./page.module.css";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // make sure that the user is coming from the new-game page
  useEffect(() => {
    if (document.referrer) {
      const previousPath = new URL(document.referrer).pathname;
      if (previousPath !== "/new-game") {
        redirect("/new-game");
      }
    } else {
      redirect("/new-game");
    }
  }, []);

  // get game params
  const gameType = searchParams.get("game-type");
  const numPlayers = searchParams.get("num-players");
  const gameTitle = searchParams.get("game-title");

  // make sure params exist
  useEffect(() => {
    if (!gameType || !numPlayers || !gameTitle) redirect("/new-game");
  }, [gameType, numPlayers, gameTitle, router]);

  // add game name to local storage
  const savedGames = JSON.parse(localStorage.getItem("savedGames"));
  if (savedGames) {
    // add new game to it
    console.log(savedGames.names);
    const updatedNames = [...savedGames.names, gameTitle];
    const savedGamesData = { names: updatedNames };
    localStorage.setItem("savedGames", JSON.stringify(savedGamesData));
  } else {
    // create savedGamesObject if one doesn't already exist
    const initialGameData = {
      names: [gameTitle],
    };
    localStorage.setItem("savedGames", JSON.stringify(initialGameData));
  }

  // add game data to local storage
  const gameData = {
    type: gameType,
    numberOfPlayer: numPlayers,
    round: 0,
    game: {},
  };
  localStorage.setItem(gameTitle, JSON.stringify(gameData));

  return (
    <Main centered>
      <div className={styles.spinner}></div>
      <div>{gameType}</div>
      <div>{numPlayers}</div>
      <div>{gameTitle}</div>
    </Main>
  );
}

export default Page;
