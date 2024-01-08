import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent, map, tap, Subscription, pairwise, share, Subject, BehaviorSubject } from 'rxjs';
import { updateDisplay } from '../../shared/display-log';


@Component({
  selector: 'app-16-subject',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>16-subject works!</p>
    <h1>Do some scroll</h1>
    <div id="progress-bar"></div>
    <div id="log-container"></div>
    <div id="scrollable-space"></div>
    <div id="footer">You've reached the end of the page</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectComponent implements OnInit {

  subscription = new Subscription();
  subscription2 = new Subscription();

  ngOnInit() {
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage: any) => {
        progressBar!!.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt)),
        pairwise(), //Emite en pareja de datos consecutivos 
        tap(([previous, current]) =>{
            updateDisplay(current > previous ? 'DESC' : 'ASC');
        }),
        map(([previous, current]) => current)
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    //const scrollProgressHot$ = new Subject();
    const scrollProgressHot$ = new BehaviorSubject(0);
    scrollProgress$.subscribe(scrollProgressHot$);

    //subscribe to scroll progress to paint a progress bar
    this.subscription = scrollProgressHot$.subscribe(updateProgressBar); // ahora se subscriben al subject

    this.subscription2 = scrollProgressHot$.subscribe(
      (val: any) => updateDisplay(`${ Math.floor(val) } %`)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
