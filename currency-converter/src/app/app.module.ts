import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { CurrenciesState } from './store/currencies.state';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { MainComponent } from './shell/main/main.component';
import { FooterComponent } from './footer/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoundPipe } from './shared/pipe/round.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    RoundPipe,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot([]),
    NgxsModule.forRoot([CurrenciesState], {
      developmentMode: !environment.production
    }),
    BrowserModule,
    StoreDevtoolsModule.instrument(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
