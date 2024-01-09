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
import { StartWithEndWithComponent } from './pages/12-startwith-endwidth/12-startwith-endwidth';
import { DistinctComponent } from './pages/13-distinct-distinctuntilchanged/13-distinct-distinctuntilchanged';
import { PairwiseComponent } from './pages/14-pairwise/14-pairwise';
import { ShareComponent } from './pages/15-share/15-share';
import { SubjectComponent } from './pages/16-subject/16-subject';
import { SampleTimeComponent } from './pages/17-sampletime-throttletime-audittime/17-sampletime-throttletime-audittime';
import { DelayComponent } from './pages/18-delay-buffer-time/18-delay-buffer-time';
import { DebouncetimeComponent } from './pages/19-debouncetime/19-debouncetime';
import { ZipMergeComponent } from './pages/20-zip-merge/20-zip-merge';
import { ConcatComponent } from './pages/21-concat-forkjoin/21-concat-forkjoin';

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
    { path: '12', component: StartWithEndWithComponent },
    { path: '13', component: DistinctComponent },
    { path: '14', component: PairwiseComponent },
    { path: '15', component: ShareComponent },
    { path: '16', component: SubjectComponent },
    { path: '17', component: SampleTimeComponent },
    { path: '18', component: DelayComponent },
    { path: '19', component: DebouncetimeComponent },
    { path: '20', component: ZipMergeComponent },
    { path: '21', component: ConcatComponent },


  ];
