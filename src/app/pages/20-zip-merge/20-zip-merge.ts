import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, Subscription, debounceTime, tap, merge, scan, filter, distinctUntilChanged, zip } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-20-zip-merge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>20-zip-merge works!</p>
    <canvas id="drawboard" width="400" height="400"></canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZipMergeComponent implements OnInit {

  subscription = new Subscription();

  ngOnInit() {

     /** init canvas and context reference  */
     const canvas =  <HTMLCanvasElement>  document.getElementById('drawboard')!!;
     const ctx = canvas.getContext('2d')!!;
 
     /** method to draw a line in canvas  */
     const drawLine = (initCoords: any, endCoords: any) => {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.beginPath();
         ctx.moveTo(initCoords.x, initCoords.y);
         ctx.lineTo(endCoords.x, endCoords.y);
         ctx.strokeStyle = 'black';
         ctx.lineWidth = 2;
         ctx.stroke();
         ctx.closePath();
     }
 
     /** helper method to retrieve local coords from click */
     const getLocalClickCoords = (event: any, parent: any) =>{
         return {
             x: event.clientX - parent.offsetLeft,
             y: event.clientY - parent.offsetTop,
         }
     }
 
     /** observable from canvas mouse down events */
     const mouseStart$ = fromEvent(canvas, 'mousedown').pipe(
         map(event => {
             return {
                 label: 'start',
                 coords: getLocalClickCoords(event, canvas)
             }
         }));
 
     /** observable from canvas mouse up events */
     const mouseEnd$ = fromEvent(canvas, 'mouseup').pipe(
         map(event => {
             return {
                 label: 'end',
                 coords: getLocalClickCoords(event, canvas)
             }
         }));
 
     /** observable from canvas mouse move events */
     const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
         map(event => {
             return {
                 label: 'drawing',
                 coords: getLocalClickCoords(event, canvas)
             }
         }));        
 
 
     /** zip example */
     //Combina varios Observables para crear otro Observable cuyos valores se calculen a partir de las emisiones
     // const drawLine$ = zip(mouseStart$, mouseEnd$).pipe(
     //     tap(console.log),
     //     map(([start, end]) => {
     //         return {
     //             origin: start.coords,
     //             end: end.coords
     //         }
     //     })
     // );
 
     /** merge example */
     //Ver la linea mientras la estamos dibujando
     //varios flujos que convergen en uno
     const computeDrawState = (prevState: any, event: any) => {
         switch(prevState.label){
             case 'init':
             case 'end':
                 if(event.label == 'start'){
                     return {origin:event.coords, ...event}; 
                 }
                 break;
             case 'start':
             case 'drawing':
                 return {origin: prevState.origin, ...event}
         };
         return prevState;
     }
 
     const drawLine$ = merge(mouseStart$, mouseMove$, mouseEnd$).pipe(
         scan(computeDrawState, {label:'init'}),
         filter(data => data.origin && data.coords), //Filtrar cuando no hay nada que pintar
         distinctUntilChanged(), //Evitar duplicados
         tap(console.log),
     );
 
 
     drawLine$.subscribe(data => drawLine(data.origin, data.coords));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
