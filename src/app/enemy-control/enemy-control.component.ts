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
import {enemyHP, playerHP} from "../../gamecontrol";

@Component({
  selector: 'app-enemy-control',
  templateUrl: './enemy-control.component.html',
  styleUrls: ['./enemy-control.component.css']
})
export class EnemyControlComponent {

    protected readonly unitSpeed = unitSpeed;
    protected readonly isUnitReady = isUnitReady;
    protected readonly spawnedUnit = spawnedUnit;
    protected readonly waitTimeBar = waitTimeBar;
    protected readonly spawnSpeed = spawnSpeed;
  protected readonly playerHP = playerHP;
  protected readonly enemyHP = enemyHP;
  protected readonly enemySpawnSpeed = enemySpawnSpeed;
  protected readonly enemyTimeBar = enemyTimeBar;
  protected readonly enemyUnitSpeed = enemyUnitSpeed;
  protected readonly enemyMinPower = enemyMinPower;
  protected readonly enemyMaxPower = enemyMaxPower;
}

export let enemyMinPower = signal(1);
export  let enemyMaxPower = signal(3);
export let enemyUnitSpeed = signal(2000);


export let enemySpawnSpeed = signal(2500);
export let enemyTimeBar = signal(0);
