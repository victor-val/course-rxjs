import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, Subscription, debounceTime, tap, merge, scan, filter, distinctUntilChanged, zip, forkJoin, endWith, concat, withLatestFrom } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-22-combinelatest-withlatestfrom',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>22-combinelatest-withlatestfrom works!</p>
    <h1>Submit form</h1>
    <form id="form">
      <div>
          <label for="username">Name: </label>
          <input type="text" name="name" >
      </div>
      <div>
          <label for="username">Email: </label>
          <input type="email" name="email" >
      </div>
      <div>
          <label for="username">Phone: </label>
          <input type="tel" name="phone" >
      </div>            
      <button id="btn" type="button">Add contact</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombineLatestComponent implements OnInit {

  subscription = new Subscription();

  ngOnInit() {
    const form : any= document.getElementById('form')!!;
    
    /** get observables from each form element */
    const formName$ = fromEvent(form.name, 'input').pipe(
        debounceTime(400),
        map((evt: any) => evt.target.value)
    );
    const formEmail$ = fromEvent(form.email, 'input').pipe(
        debounceTime(400),
        map((evt: any) => evt.target.value)
    );
    const formNumber$ = fromEvent(form.phone, 'input').pipe(
        debounceTime(400),
        map((evt: any) => evt.target.value)
    );
    const submitButton$ = fromEvent(form.btn, 'click');

    // const formData$ = combineLatest(formName$, formEmail$, formNumber$); 
    
    const formData$ = submitButton$.pipe(
        withLatestFrom(formName$, formEmail$, formNumber$), //combina los valores con los anteriores. Cambias uno y siguen estando el resto
        map(data => {
            const [click, ...formData] = data;
            return formData;
        })
    );
    
    formData$.subscribe();

   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
