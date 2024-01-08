import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Observer, from } from 'rxjs';
import { displayLog } from '../../shared/display-log';

@Component({
  selector: 'app-03-from',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>03-from works!</p>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromComponent implements OnInit {
  ngOnInit() {
    const myArray = [1,2,3,4,5];  
    const myString = "Hello world!";  
    const myPromise = new Promise(resolve => setTimeout( () => {
        resolve('Hello World!'); 
    },2000));

    const observable = from(myPromise); // myArray, myString , myPromise
    const subscription = observable.subscribe( (val: any) => displayLog(val));
  }
}
