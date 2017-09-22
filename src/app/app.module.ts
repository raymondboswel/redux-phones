import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { rootReducer, IAppState, INITIAL_STATE } from '../store';
import { PhoneActions } from './app.actions';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { PhoneListComponent } from './phone-list/phone-list.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PhoneListComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    NgReduxModule,
    routing,
    FormsModule,
    CustomFormsModule
  ],
  providers: [PhoneActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
