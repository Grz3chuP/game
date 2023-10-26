import {Component, signal, Renderer2, ElementRef} from '@angular/core';
import {Boardtemplate} from "src/models/boardtemplate";
import {interval} from "rxjs";
import {checkIfUnitIsReady, isUnitReady, playerMaxPower, spawnedUnit, unitSpeed} from "../playerspawner";
import {checkIfTrapIsReady, isTrapReady, trapPower} from "./trap/trap.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game';
  board: Boardtemplate[] = [];
  filledBoard: Boardtemplate[] = [];
  enemyMinPower = 1;
  enemyMaxPower = 3;


  spawnMinTime = 2000;
  spawnMaxTime = 3000;
  playerHP = 15;
  enemyHP = 15;
  spawningPionts = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  spawnEnemyPoints = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.board = Array(100).fill({}, 0, 100)
    this.board.forEach((item, index) => {
      if (this.spawningPionts.includes(index)) {
      this.board[index] = {id: index, value: 0, enemy: 0, isClicked: false, base: true};
      } else {
        this.board[index] = {id: index, value: 0, enemy: 0, isClicked: false, base: false};
      }
    });
    this.filledBoard = [...this.board];


    console.log(this.filledBoard[9].isClicked);
  }

  handleClick(id: number) {
    this.filledBoard[id].isClicked = !this.filledBoard[id].isClicked;
    this.filledBoard[id].value = 1;
    console.log(this.filledBoard[id]);
  }

  movingElement = (target: HTMLElement) => {
    let left = 0;
    const move = setInterval(() => {
      if (left < 500) {
        left += 55;
        target.style.left = left + "px";
        if (left === 50) {
          target.remove();
          clearInterval(move)
        }
      } else {

      }

    }, 2000);

  }





  randomlySpawn(target: HTMLElement) {
    const newDiv = this.renderer.createElement('div');

    this.renderer.setStyle(newDiv, 'background-color', 'yellow');
    this.renderer.setStyle(newDiv, 'z-index', '10');
    this.renderer.setStyle(newDiv, 'position', 'absolute');
    this.renderer.setStyle(newDiv, 'top', '0');
    this.renderer.setStyle(newDiv, 'left', '0');
    this.renderer.setStyle(newDiv, 'width', '50px');
    this.renderer.setStyle(newDiv, 'height', '50px');
    this.renderer.setStyle(newDiv, 'overflow', 'hidden');
    this.renderer.setStyle(newDiv, 'transition', '0.2s');

    this.renderer.setProperty(newDiv, 'textContent', 'This is a dynamically appended div.');
    this.renderer.appendChild(target, newDiv);
    this.movingElement(newDiv);

  }


  addNumber(id: number, value: number) {

    if (this.spawningPionts.includes(id) && this.filledBoard[id].value === 0) {
      if (isUnitReady()) {
        this.filledBoard[id].value += spawnedUnit();
        this.movingNumber(id, unitSpeed());
        isUnitReady.set(false);
        spawnedUnit.set(0);
        checkIfUnitIsReady();
      }

    }
    if (this.filledBoard[id].enemy > 0) {
      this.filledBoard[id].enemy -= 1;
      this.animacja(id, 100);
    }
    if (this.filledBoard[id].value === 0 && this.filledBoard[id].enemy === 0 && !this.spawningPionts.includes(id) && isTrapReady() && !this.spawnEnemyPoints.includes(id)  ) {
      this.filledBoard[id].value += trapPower();
      if (this.filledBoard[id + 1].value === 0 && this.filledBoard[id+ 1].enemy === 0 && !this.spawningPionts.includes(id +1) && !this.spawnEnemyPoints.includes(id + 1)) {
        this.filledBoard[id + 1].value += trapPower() / 2;
      }
      if (this.filledBoard[id - 1].value === 0 && this.filledBoard[id - 1].enemy === 0 && !this.spawningPionts.includes(id - 1) && !this.spawnEnemyPoints.includes(id - 1) ) {
        this.filledBoard[id - 1 ].value += trapPower() / 2;
      }
      if (this.filledBoard[id + 10].value === 0 && this.filledBoard[id + 10].enemy === 0 && !this.spawningPionts.includes(id + 10) && !this.spawnEnemyPoints.includes(id + 10)) {
        this.filledBoard[id + 10].value += trapPower() / 2;
      }
      if (this.filledBoard[id - 10].value === 0 && this.filledBoard[id - 10].enemy === 0 && !this.spawningPionts.includes(id - 10) && !this.spawnEnemyPoints.includes(id - 10)) {
        this.filledBoard[id - 10].value += trapPower() / 2;
      }




      isTrapReady.set(false);
      checkIfTrapIsReady();
      this.animacja(id, 100);
    }
  }
  movingNumber = (id: number, speed: number) => {
    let leftX = 1;
    const move = setInterval(() => {
      if (leftX <= 10) {
        if (this.filledBoard[id + leftX - 1].value > 0) {
          this.filledBoard[id + leftX].value = this.filledBoard[id + leftX - 1].value;
          this.filledBoard[id + leftX - 1].value = 0;

          // Check if a fight condition is met
          if (this.filledBoard[id + leftX].value > 0 && this.filledBoard[id + leftX].enemy > 0) {

            this.fight(id + leftX);
          }

          leftX += 1;
          if(leftX === 10) {
            this.enemyHP -= this.filledBoard[id + leftX - 1].value;
            this.filledBoard[id + leftX - 1].value = 0;
          }
        } else {
          clearInterval(move);
        }
      } else {
        clearInterval(move);
      }
    }, speed);
  }
  movingEnemy = (id: number) => {
    let leftX = 1;
    const move = setInterval(() => {
      if (leftX <= 10) {
        if (this.filledBoard[id - leftX + 1].enemy > 0) {
          this.filledBoard[id - leftX].enemy = this.filledBoard[id - leftX + 1].enemy;
          this.filledBoard[id - leftX + 1].enemy = 0;

          // Check if a fight condition is met
          if (this.filledBoard[id - leftX].value > 0 && this.filledBoard[id - leftX].enemy > 0) {
            this.fight(id - leftX);
          }

          leftX += 1;
          if(leftX === 10) {
           this.playerHP -= this.filledBoard[id - leftX + 1].enemy;
            this.filledBoard[id - leftX + 1].enemy = 0;
          }
        } else {
          clearInterval(move);
        }
      } else {
        clearInterval(move);
      }
    }, 2000);
  }

  randomlySpawnEnemy() {
    const spawnEnemy = setInterval(() => {

    const randomSpawn = Math.floor(Math.random() * this.spawnEnemyPoints.length);
    let randomEnemyStrenght = Math.floor(Math.random() * this.enemyMaxPower) + this.enemyMinPower;
    console.log(randomSpawn);
    this.filledBoard[this.spawnEnemyPoints[randomSpawn]].enemy = randomEnemyStrenght;
    this.movingEnemy(this.spawnEnemyPoints[randomSpawn]);
    }, Math.floor(Math.random() * this.spawnMaxTime) + this.spawnMinTime);
  }



  fight(id: number) {

    const val = this.filledBoard[id].value;
    const enemy = this.filledBoard[id].enemy;
    console.log('val' + val + 'enemy' + enemy);
    this.filledBoard[id].value -=  enemy;
    this.filledBoard[id].enemy -=  val;
    if (this.filledBoard[id].value <= 0) {
      this.filledBoard[id].value = 0;
    } else if (this.filledBoard[id].enemy <= 0) {
      this.filledBoard[id].enemy = 0;
    }
    this.animacja(id, 150);
  console.log('fight');
  }

  animacja = (id: number,speed: number) => {
    this.filledBoard[id].isClicked = true;
    const anim = setInterval(() => {
      this.filledBoard[id].isClicked = false;
      clearInterval(anim);

    }, speed);
  }

  protected readonly playerMaxPower = playerMaxPower;
}


