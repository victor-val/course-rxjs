import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  fromEvent,
  map,
  Subscription,
  tap,
  endWith,
  concat,
  mergeMap,
  scan,
  concatMap,
  switchMap,
} from 'rxjs';
import { displayLog } from '../../shared/display-log';
import { api } from './api';

@Component({
  selector: 'app-24-switchmap-concatmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>24-switchmap-concatmap works!</p>
    <h1>Get some comments</h1>
    <button id="btn">Click me!</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchmapComponent implements OnInit {
  subscription = new Subscription();

  ngOnInit() {
    const button = document.getElementById('btn')!!;
    fromEvent(button, 'click').pipe(
      scan((acc, evt) => acc + 1, 0),            
      //mergeMap(id => api.getComment(id)), //llamada a la api con el id correspondiente
      //switchMap(id => api.getComment(id)), //cuando recibe un nuevo evento cancela el anterior. Muchos clicks solo devuelve 1
      concatMap(id => api.getComment(id)), //No se subscribe al segundo evento hasta que no completa el primero. De forma ordenada
      map(console.log),
      tap(console.log),
  ).subscribe(displayLog);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
