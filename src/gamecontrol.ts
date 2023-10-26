import {computed, signal} from "@angular/core";

export let playerHP = signal(15);
export let enemyHP = signal(15);

export const endGame = computed(() => {
  if (playerHP() <= 0) {
    alert('Defeat');
    return true;
  }
  if (enemyHP() <= 0) {
    alert('Victory');
    return true;
  }
  else {
    return false;
  }

})
