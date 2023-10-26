import {computed, signal} from "@angular/core";

export let isUnitReady = signal(false);
//szybkosc spawnu
export let spawnSpeed = signal(2500);
//moc minimalna jednostki
export let playerMinPower = signal(1);
//moc maksymalna jednostki
export let playerMaxPower = signal(3);
//szybkosc minimalna jednostki
export let playerMinSpeed = signal(500);
//szybkosc maksymalna jednostki
export let playerMaxSpeed = signal(1000);
//sila jednostki ktora zostala wylosowana
export let spawnedUnit = signal(0);
//szybkosc jednostki ktora zostala wylosowana
export let unitSpeed = signal(1000);
export let waitTimeBar = signal(0);
export let checkIfUnitIsReady = computed(() => {

  if(!isUnitReady()) {
    let time = 0;
    const progressBar = setInterval(() => {
      if (time < spawnSpeed() ) {
        waitTimeBar.set(time);
        time += spawnSpeed() / 100;
      } else {
        clearInterval(progressBar);
      }
    }, spawnSpeed() / 100);
     setTimeout(() => {

      spawnedUnit.set(Math.floor(Math.random() * playerMaxPower()) + playerMinPower());
      let halfStrenght =Math.floor(spawnedUnit() / 2) + 1 ;
      console.log( 'polowa sily' + halfStrenght);
      if (spawnedUnit() <= halfStrenght) {
        unitSpeed.set(Math.floor(Math.random() * playerMaxSpeed()) + playerMinSpeed());
        console.log('szybko' +unitSpeed());
      } else {
        unitSpeed.set(Math.floor(Math.random() * (playerMaxSpeed())) + (playerMinSpeed() * 2));
        console.log('wolno'+unitSpeed());
      }
       isUnitReady.set(true);
    }, spawnSpeed());
  }
})



