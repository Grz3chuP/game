import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpawnControlComponent } from './spawn-control/spawn-control.component';
import { TrapComponent } from './trap/trap.component';
import { EnemyControlComponent } from './enemy-control/enemy-control.component';

@NgModule({
  declarations: [
    AppComponent,
    SpawnControlComponent,
    TrapComponent,
    EnemyControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
