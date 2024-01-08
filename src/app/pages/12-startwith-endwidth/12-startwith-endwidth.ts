import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo, subscribeOn, tap, Subscription, first, take, takeWhile, skip, last, takeLast, scan, reduce, startWith, endWith } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-12-startwith-endwidth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>12-startwith-endwidth works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartWithEndWithComponent implements OnInit {
  subscription = new Subscription();
  ngOnInit() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'block';
    const click$ = fromEvent(grid!!, 'click').pipe(
        map((val: any) => [ 
            Math.floor(val.offsetX/50), //Cada casilla es de 50x50
            Math.floor(val.offsetY/50) //Ahora al clicar salen las coordenadas del 0 al 9
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        startWith("grid dimensions:", "10x10"), // Se añaden 2 eventos al principio
        endWith("game finished", "bye!")
      );
    this.subscription = click$.subscribe((data: any) => displayLog(data));

  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
    this.subscription.unsubscribe();
  }
}
