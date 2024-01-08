import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { of, range } from 'rxjs';
import { displayLog } from '../../shared/display-log';

@Component({
  selector: 'app-04-range-of',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>04-range-y-of works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeOfComponent implements OnInit {
  ngOnInit() {
    //Crear observables a partir de secuencias de datos con of y range
    const source = of(1, 2, 3, 4, 5, 6);
    const source2 = of(
        [1, 2, 3], 
        "hello world", 
        { foo: 'bar' }, 
        function sayHello() {
        return 'Hi!';
      });

    
    const subscription = source.subscribe((data: any) => displayLog(data)); 
    const subscription2 = source2.subscribe((data: any) => displayLog(data));

    const source3 = range(3,10);
    const subscription3 = source3.subscribe((data: any) => displayLog(data));
  }
}
