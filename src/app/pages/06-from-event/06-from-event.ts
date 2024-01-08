import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { displayLog } from '../../shared/display-log';


@Component({
  selector: 'app-06-from-event',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>06-from-event works!</p>
    <button id="action-btn">Click me</button>
    <div id="log-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromEventComponent implements OnInit {
  ngOnInit() {
    //Reaccionar a eventos de la interfaz
    const actionBtn = document.getElementById('action-btn');
    const source = fromEvent(actionBtn!!, 'click');
    const subscription = source.subscribe((evt:any) => {
        displayLog(`click event at pos (${evt.x}, ${evt.y})`);
    });

    fromEvent(document, 'mousemove').subscribe(evt => {
        console.log(evt);
    });
  }
}
