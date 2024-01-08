import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo, subscribeOn, tap, Subscription, first, take, takeWhile, skip, last, takeLast, scan, reduce } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-11-reduce-scan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>11-reduce-scan works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReduceScanComponent implements OnInit {
  subscription = new Subscription();
  ngOnInit() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'block';
    const click$ = fromEvent(grid!!, 'click').pipe(
        map((val: any) => [ 
            Math.floor(val.offsetX/50), //Cada casilla es de 50x50
            Math.floor(val.offsetY/50) //Ahora al clicar salen las coordenadas del 0 al 9
        ]),
        takeWhile( ([col, row]) => col != 0 ), //hasta col sea 0
        tap(val => console.log(`cell: [${val}]`)),
        // scan((accumulated: any, current) => { //Lo mismo que reduce, pero va mostrando el historico a cada evento recibido
        reduce((accumulated: any, current) => { // Devuelve todos las coordenadas de los clicks mas el sumatorio total de clicks 
            return {
                clicks: accumulated.clicks + 1,
                cells: [...accumulated.cells, current]
            }
        }, {clicks:0, cells:[]}),
      );
    this.subscription = click$.subscribe(data => displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`));

  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
    this.subscription.unsubscribe();
  }
}
