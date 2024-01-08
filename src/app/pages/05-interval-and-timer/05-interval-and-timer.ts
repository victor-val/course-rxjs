import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, of, range, timer } from 'rxjs';
import { displayLog } from '../../shared/display-log';

@Component({
  selector: 'app-05-interval-and-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>05-interval-and-timer works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntervalTimerComponent implements OnInit {
  ngOnInit() {
    //interval devuelve una secuencia que no termina nunca, por eso poner timeout
    const source = interval(500);
    
    const subscription = source.subscribe((data: any) => displayLog(data));

    //setTimeout(() => subscription.unsubscribe(), 3000 ); // Parar secuencia
    timer(3000).subscribe(()=> subscription.unsubscribe()); // Equivale al timeout
    

    const source2 = timer(4000, 100);
    const subscription2 = source2.subscribe(data => displayLog(`2 - ${data}`));
    timer(6000).subscribe(() => subscription2.unsubscribe());
  }
}
