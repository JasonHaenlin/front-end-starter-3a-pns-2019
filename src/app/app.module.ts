import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketService } from '../services/ticket/ticket.service';
import { StudentService } from './../services/student/student.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentComponent, StudentDetailComponent, StudentFormComponent, StudentListComponent, StudentPageComponent } from './students';
import { TicketComponent, TicketFormComponent, TicketListComponent, TicketPageComponent } from './tickets';
import { SearchPipe } from './tickets/search.pipe';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { LoaderComponent } from './loader';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketFormComponent,
    TicketListComponent,
    HeaderComponent,
    PageNotFoundComponent,
    TicketPageComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentComponent,
    StudentPageComponent,
    StudentDetailComponent,
    SearchPipe,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgReduxModule,
  ],
  providers: [TicketService, StudentService],
  bootstrap: [AppComponent]
})

export class AppModule {
  // constructor(
  //   private ngRedux: NgRedux<IAppState>,
  //   private devTools: DevToolsExtension) {

  //   let enhancers = [];
  //   // ... add whatever other enhancers you want.

  //   // You probably only want to expose this tool in devMode.
  //   if (devTools.isEnabled()) {
  //     enhancers = [...enhancers, devTools.enhancer()];
  //   }

  //   this.ngRedux.configureStore(
  //     rootReducer,
  //     initialState,
  //     [],
  //     enhancers);
  // }
}
