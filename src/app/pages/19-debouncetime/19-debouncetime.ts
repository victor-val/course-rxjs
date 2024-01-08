import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, Subscription, debounceTime, tap } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-19-debouncetime',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>19-debouncetime works!</p>
    <input id="input-box" type="text">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebouncetimeComponent implements OnInit {

  subscription = new Subscription();

  ngOnInit() {
    const inputBox = document.getElementById('input-box')!!;

    const inputSrc$ = fromEvent(inputBox, "input").pipe(
        debounceTime(300),
        map((event: any) => console.log(event.target.value))
    );

    this.subscription = inputSrc$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
