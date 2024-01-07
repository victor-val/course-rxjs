import { Routes } from '@angular/router';
import { ObservableCreateComponent } from './pages/01-observable-create/01-observable-create.component';
import { SubscriptionsComponent } from './pages/02-subscriptions/02-subscriptions';

export const routes: Routes = [
    { path: '01', component: ObservableCreateComponent },
    { path: '02', component: SubscriptionsComponent },
  ];
