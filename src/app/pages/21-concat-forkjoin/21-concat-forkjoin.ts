import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, Subscription, debounceTime, tap, merge, scan, filter, distinctUntilChanged, zip, forkJoin, endWith, concat } from 'rxjs';
import { displayLog } from '../../shared/display-log';
import { api } from './api';


@Component({
  selector: 'app-21-concat-forkjoin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>21-concat-forkjoin works!</p>
    <h1>Get some comments</h1>
    <button id="btn">Click me!</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcatComponent implements OnInit {

  subscription = new Subscription();

  ngOnInit() {

    const button = document.getElementById('btn')!!;

    /** get 4 consecutive comments */
    const getComments = () =>{
        //get observables from fake REST API.
        const comment1$ = api.getComment(1);
        const comment2$ = api.getComment(2);
        const comment3$ = api.getComment(3);
        const comment4$ = api.getComment(4);

        //subscribe to all the observables to get and display comments
        //merge -> se ejecutan desordenados
        //concat se ejecutan ordenados
        //forkjoin espera que se completen todos y devuelve el conjunto
        forkJoin(comment1$, comment2$, comment3$, comment4$).pipe(
            map(({id, comment}: any)=> `#${id} - ${comment}`),
            tap(console.log),
            endWith('--------//--------')
        ).subscribe((data: any) =>{
            displayLog(data);
        })
    }

    /** get comments on button click */
    fromEvent(button, 'click').subscribe(getComments);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
