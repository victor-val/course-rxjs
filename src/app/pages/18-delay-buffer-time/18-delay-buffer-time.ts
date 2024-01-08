import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, tap, Subscription, delay, bufferTime } from 'rxjs';
import { updateDisplay } from '../../shared/display-log';


@Component({
  selector: 'app-18-delay-buffer-time',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>18-delay-buffer-time works!</p>
    <h1>Do some scroll</h1>
    <div id="progress-bar"></div>
    <div id="log-container"></div>
    <div id="scrollable-space"></div>
    <div id="footer">You've reached the end of the page</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayComponent implements OnInit {

  subscription = new Subscription();

  ngOnInit() {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage: any) => {
        progressBar!!.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
      map(() => docElement.scrollTop),
      tap(evt => console.log("[scroll]: ", evt))
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }),
        //delay(500),
        bufferTime(300, 1000), //Almacena y luego lo emite, ventana de 300ms cada 1000ms. No se muestra la barra pq cambia el tipo dato
        tap(evt => console.log("[buffer]: ", evt))
    )

    //subscribe to scroll progress to paint a progress bar
    this.subscription = scrollProgress$.subscribe(updateProgressBar);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
