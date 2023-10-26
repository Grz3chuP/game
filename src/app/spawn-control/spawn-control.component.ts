import {Component, computed, signal} from '@angular/core';
import {
  checkIfUnitIsReady,
  isUnitReady,
  playerMaxPower,
  playerMinPower,
  spawnedUnit,
  spawnSpeed, waitTimeBar
} from "../../playerspawner";

@Component({
  selector: 'app-spawn-control',
  templateUrl: './spawn-control.component.html',
  styleUrls: ['./spawn-control.component.css']
})
export class SpawnControlComponent {


constructor() {
  checkIfUnitIsReady();
    // const spawnUnit = setTimeout(() => {
    //   isUnitReady.set(true);
    //   spawnedUnit.set(Math.floor(Math.random() * playerMaxPower()) + playerMinPower());
    // }, spawnSpeed());


}

  protected readonly spawnedUnit = spawnedUnit;
  protected readonly isUnitReady = isUnitReady;
  protected readonly waitTimeBar = waitTimeBar;
  protected readonly spawnSpeed = spawnSpeed;
}
