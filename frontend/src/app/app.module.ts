import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { EffectsModule, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { Store, StoreModule } from "@ngrx/store";
import { authReducer, AuthState } from './store/reducers/auth.reducers';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MainInterceptorInterceptor } from './common/interceptor/main-interceptor.interceptor';
import { filter, Observable, take, takeWhile, tap } from 'rxjs';
import { selectInitializationState } from './store/selectors/auth.selectors';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    EffectsModule.forRoot([AuthEffects, ]),
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // add the interceptor here
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptorInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AuthState>) => {
        // return () => {
        //   store.dispatch({ type: ROOT_EFFECTS_INIT });
        //   console.log("App Initializer");
        // };
        return () => new Promise(resolve => {
          store.dispatch({ type: ROOT_EFFECTS_INIT });
          store.select(selectInitializationState).subscribe((data) => {
            if (data.ready) {
              resolve(true);
            }
          });
        });
      },
      multi: true,
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
