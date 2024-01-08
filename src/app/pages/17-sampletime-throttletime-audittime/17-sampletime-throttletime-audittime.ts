import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, tap, Subscription, pairwise, share, Subject, BehaviorSubject, throttleTime, auditTime, sampleTime } from 'rxjs';
import { updateDisplay } from '../../shared/display-log';


@Component({
  selector: 'app-17-sampletime-throttletime-audittime',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>17-sampletime-throttletime-audittime works!</p>
    <h1>Do some scroll</h1>
    <div id="progress-bar"></div>
    <div id="log-container"></div>
    <div id="scrollable-space"></div>
    <div id="footer">You've reached the end of the page</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleTimeComponent implements OnInit {

  subscription = new Subscription();

  ngOnInit() {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage: any) => {
        progressBar!!.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
      tap(evt => console.log("[scroll event]")),
      //con estos operadores se limita la frecuencia con la que el observable recibe eventos
      //sampleTime(50), //se emite la ultima muestra
      //auditTime(50),
      throttleTime(50), //se salta eventos
      map(() => docElement.scrollTop),
      tap(evt => console.log("[scroll]: ", evt))
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    //subscribe to scroll progress to paint a progress bar
    this.subscription = scrollProgress$.subscribe(updateProgressBar);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
