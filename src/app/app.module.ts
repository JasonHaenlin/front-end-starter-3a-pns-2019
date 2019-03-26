import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
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
import { LoaderComponent } from './loader';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentComponent, StudentDetailComponent, StudentFormComponent, StudentListComponent, StudentPageComponent } from './students';
import { TicketComponent, TicketFormComponent, TicketListComponent, TicketPageComponent } from './tickets';
import { SearchPipe } from './tickets/search.pipe';

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
}
