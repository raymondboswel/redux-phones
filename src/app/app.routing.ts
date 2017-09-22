import { Routes, RouterModule } from '@angular/router';

import { PhoneListComponent } from './phone-list/phone-list.component';

const appRoutes: Routes = [
  { path: '', component: PhoneListComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
