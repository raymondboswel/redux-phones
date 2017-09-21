import { Routes, RouterModule } from '@angular/router';

import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
import { PhoneListComponent } from './phone-list/phone-list.component';

const appRoutes: Routes = [
  { path: '', component: PhoneListComponent},
  { path: 'phones/:phone_id', component: PhoneDetailComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
