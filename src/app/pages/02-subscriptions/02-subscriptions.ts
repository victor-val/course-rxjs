import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { displayLog } from '../../shared/display-log';

@Component({
  selector: 'app-02-subscriptions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>02-subscriptions works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent implements OnInit {
  ngOnInit() {
    const hello = Observable.create(function (observer: Observer<string>) {
      observer.next('Hello');
      setTimeout(() => {
        observer.next('World');
        observer.complete();
      }, 2000);
    });

    const observer = {
      next: (evt: any) => displayLog(evt),
      error: (err: any) => console.error("[ERR] - ", err),
      complete: () => displayLog("[DONE]")
  }

    const subscribe = hello.subscribe((evt: string) => displayLog(evt));
    const subscribe2 = hello.subscribe(observer);
    subscribe.unsubscribe();
  }
}
