import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo, subscribeOn, tap, Subscription, first, take, takeWhile, skip, last, takeLast } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-10-last-takelast-skip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>10-last-takelast-skip works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastTakelastSkipComponent implements OnInit {
  subscription = new Subscription();
  ngOnInit() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'block';
    const click$ = fromEvent(grid!!, 'click').pipe(
        map((val: any) => [ 
            Math.floor(val.offsetX/50), //Cada casilla es de 50x50
            Math.floor(val.offsetY/50) //Ahora al clicar salen las coordenadas del 0 al 9
        ]),
        // takeWhile( ([col, row]) => col > 3 ),
        // tap(val => console.log(`cell: [${val}]`)),
        // last() //Finaliza cuando clicas en una columna < 4 y devuelve el ultimo que cumplio la condicion

        // takeWhile( ([col, row]) => col > 3 ),
        // tap(val => console.log(`cell: [${val}]`)),
        // takeLast(3) //Finaliza cuando clicas en una columna < 4 y devuelve los 3 ultimos que cumplieron la condicion

        tap(val => console.log(`cell: [${val}]`)),
        skip(5) //Se salta los primeros 5 clicks
      );
    this.subscription = click$.subscribe((data: any) => displayLog(data));
  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
    this.subscription.unsubscribe();
  }
}
