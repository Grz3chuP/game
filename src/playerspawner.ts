import {computed, signal} from "@angular/core";

export let isUnitReady = signal(false);
export let spawnSpeed = signal(2500);
export let playerMinPower = signal(1);
export let playerMaxPower = signal(3);
export let spawnedUnit = signal(0);

export let checkIfUnitIsReady = computed(() => {

  if(!isUnitReady()) {
    const spawnUnit = setTimeout(() => {
      isUnitReady.set(true);
      spawnedUnit.set(Math.floor(Math.random() * playerMaxPower()) + playerMinPower());
    }, spawnSpeed());
  }
})
