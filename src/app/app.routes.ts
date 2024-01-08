import { Routes } from '@angular/router';
import { ObservableCreateComponent } from './pages/01-observable-create/01-observable-create.component';
import { SubscriptionsComponent } from './pages/02-subscriptions/02-subscriptions';
import { FromComponent } from './pages/03-from/03-from';
import { RangeOfComponent } from './pages/04-range-y-of/04-range-y-of';
import { IntervalTimerComponent } from './pages/05-interval-and-timer/05-interval-and-timer';
import { FromEventComponent } from './pages/06-from-event/06-from-event';
import { MaptoMapFilterComponent } from './pages/07-mapto-map-filter/07-mapto-map-filter';
import { TapComponent } from './pages/08-tap/08-tap';
import { FirstTakeTakeWhileComponent } from './pages/09-first-take-takewhile/09-first-take-takewhile';
import { LastTakelastSkipComponent } from './pages/10-last-takelast-skip/10-last-takelast-skip';
import { ReduceScanComponent } from './pages/11-reduce-scan/11-reduce-scan';

export const routes: Routes = [
    { path: '01', component: ObservableCreateComponent },
    { path: '02', component: SubscriptionsComponent },
    { path: '03', component: FromComponent },
    { path: '04', component: RangeOfComponent },
    { path: '05', component: IntervalTimerComponent },
    { path: '06', component: FromEventComponent },
    { path: '07', component: MaptoMapFilterComponent },
    { path: '08', component: TapComponent },
    { path: '09', component: FirstTakeTakeWhileComponent },
    { path: '10', component: LastTakelastSkipComponent },
    { path: '11', component: ReduceScanComponent },
  ];
