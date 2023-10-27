import {computed, signal} from "@angular/core";
import {changeDataInFirebase} from "./firebase";

export let playerHP = signal(5);
export let enemyHP = signal(5);

export let testFromDatabase = signal(0);
export let endGameScore = signal({
  wins: 0,
  loses: 0
})
export let gameIsRunning = signal(true);
export const endGame = () => {
  if (playerHP() <= 0) {
    gameIsRunning.set(false);
    endGameScore.set({loses: endGameScore().loses + 1, wins: endGameScore().wins})
    changeDataInFirebase(endGameScore());
      alert('Defeat');
    playerHP.set(15);
  }
  if (enemyHP() <= 0) {

    gameIsRunning.set(false);
    endGameScore.set({loses: endGameScore().loses, wins: endGameScore().wins + 1})
    changeDataInFirebase(endGameScore());
      alert('Victory');
    playerHP.set(15);
  }

}

export const toggleGameStatus = () => {
  gameIsRunning.set(!gameIsRunning());
}
