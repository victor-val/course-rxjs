import { Routes } from '@angular/router';
import { ObservableCreateComponent } from './pages/01-observable-create/01-observable-create.component';
import { SubscriptionsComponent } from './pages/02-subscriptions/02-subscriptions';
import { FromComponent } from './pages/03-from/03-from';
import { RangeOfComponent } from './pages/04-range-y-of/04-range-y-of';
import { IntervalTimerComponent } from './pages/05-interval-and-timer/05-interval-and-timer';
import { FromEventComponent } from './pages/06-from-event/06-from-event';

export const routes: Routes = [
    { path: '01', component: ObservableCreateComponent },
    { path: '02', component: SubscriptionsComponent },
    { path: '03', component: FromComponent },
    { path: '04', component: RangeOfComponent },
    { path: '05', component: IntervalTimerComponent },
    { path: '06', component: FromEventComponent },
  ];
