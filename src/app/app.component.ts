import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ObservableCreateComponent } from "./pages/01-observable-create/01-observable-create.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ObservableCreateComponent]
})
export class AppComponent {
  title = 'course-rxjs';
}
