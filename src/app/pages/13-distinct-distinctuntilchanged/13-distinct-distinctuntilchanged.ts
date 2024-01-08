import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo, subscribeOn, tap, Subscription, first, take, takeWhile, skip, last, takeLast, scan, reduce, startWith, endWith, distinctUntilChanged, distinct } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-13-distinct-distinctuntilchanged',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>13-distinct-distinctuntilchanged works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistinctComponent implements OnInit {
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
        // map(([col, row]) => col+row),
        // tap(val => console.log('sum of col + row is:', val)),
        // distinct(([col, row]) => `${col} - ${row}`)  // Evita repetidos
        distinctUntilChanged( // Evitar repetidos seguidos
            (cell1, cell2) =>
            (cell1[0] == cell2[0]) &&
            (cell1[1] == cell2[1])
        )
      );
    this.subscription = click$.subscribe((data: any) => displayLog(data));

  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
    this.subscription.unsubscribe();
  }
}
