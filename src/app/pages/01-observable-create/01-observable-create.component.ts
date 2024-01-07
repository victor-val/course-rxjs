import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-01-observable-create',
  standalone: true,
  imports: [CommonModule],
  template: `<p>01-observable-create works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableCreateComponent implements OnInit {
  ngOnInit() {
    const hello = Observable.create(function (observer: Observer<string>) {
      observer.next('Hello');
      setTimeout(() => {
        observer.next('World');
      }, 2000);
    });

    const subscribe = hello.subscribe((evt: string) => console.log(evt));
  }
}
