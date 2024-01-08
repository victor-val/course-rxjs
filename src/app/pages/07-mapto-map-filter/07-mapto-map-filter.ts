import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, mapTo } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-07-mapto-map-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>07-mapto-map-filter works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaptoMapFilterComponent implements OnInit {
  ngOnInit() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'block';
    const click$ = fromEvent(grid!!, 'click').pipe(
      //mapTo('CLICK') // Cada vez que se clica muestra click
        map((val: any) => [ 
            Math.floor(val.offsetX/50), //Cada casilla es de 50x50
            Math.floor(val.offsetY/50) //Ahora al clicar salen las coordenadas del 0 al 9
        ]),
        filter( val => (val[0] + val[1]) % 2 != 0 ) //Muestra solo las casillas grises, impares
    );

    const subscription = click$.subscribe((data: any) => displayLog(data));
  }

  ngOnDestroy() {
    const grid = document.getElementById('grid');
    grid!!.style.display = 'none';
  }
}
