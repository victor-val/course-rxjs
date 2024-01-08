import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo, subscribeOn, tap, Subscription } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-08-tap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>08-tap works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent implements OnInit {
  subscription = new Subscription();
  ngOnInit() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'block';
    const click$ = fromEvent(grid!!, 'click').pipe(
        tap((val: any) => console.log('before: ', val)),
        map((val: any) => [ 
            Math.floor(val.offsetX/50), //Cada casilla es de 50x50
            Math.floor(val.offsetY/50) //Ahora al clicar salen las coordenadas del 0 al 9
        ]),
        tap(val => console.log('after: ', val)),
    );

    this.subscription = click$.subscribe((data: any) => displayLog(data));
  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
    this.subscription.unsubscribe();
  }
}
