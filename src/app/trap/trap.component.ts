import {Component, computed, signal} from '@angular/core';
import {
  isUnitReady,
  playerMaxPower, playerMaxSpeed,
  playerMinPower, playerMinSpeed,
  spawnedUnit,
  spawnSpeed,
  unitSpeed,
  waitTimeBar
} from "../../playerspawner";

@Component({
  selector: 'app-trap',
  templateUrl: './trap.component.html',
  styleUrls: ['./trap.component.css']
})
export class TrapComponent {



  protected readonly isTrapReady = isTrapReady;
  protected readonly waitTimeBar = waitTimeBar;
  protected readonly trapSpeed = trapSpeed;
  protected readonly waitTrapTimeBar = waitTrapTimeBar;
}
export let isTrapReady = signal(true)
export  let trapSpeed = signal(10000);

export let trapPower = signal(2);

export let waitTrapTimeBar = signal(0);
export let checkIfTrapIsReady = computed(() => {

  if(!isTrapReady()) {
    let time = 0;
    const progressBar = setInterval(() => {
      if (time < trapSpeed() ) {
        waitTrapTimeBar.set(time);
        time += trapSpeed() / 100;
      } else {
        clearInterval(progressBar);
      }
    }, trapSpeed() / 100);
    setTimeout(() => {


      isTrapReady.set(true);
    }, trapSpeed());
  }
})
