import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo, subscribeOn, tap, Subscription, first, take, takeWhile } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-09-first-take-takewhile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>09-first-take-takewhile works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstTakeTakeWhileComponent implements OnInit {
  subscription = new Subscription();
  ngOnInit() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'block';
    const click$ = fromEvent(grid!!, 'click').pipe(
        map((val: any) => [ 
            Math.floor(val.offsetX/50), //Cada casilla es de 50x50
            Math.floor(val.offsetY/50) //Ahora al clicar salen las coordenadas del 0 al 9
        ]),
        //first() //Solo devuelve el primero aunque siga clicando
        //first(val => val[0]>3)
        // take(4)
        takeWhile( ([col, row]) => col > 3 )
    );

    this.subscription = click$.subscribe((data: any) => displayLog(data));
  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
    this.subscription.unsubscribe();
  }
}
