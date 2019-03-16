import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentDetailComponent, StudentPageComponent } from './students';
import { StudentsGuard } from './students.guard';
import { StudentDetailsResolverService } from './students/student-details-resolver.service';
import { TicketPageComponent } from './tickets';


const routes: Routes = [
  { path: 'tickets', component: TicketPageComponent },
  { path: 'students', component: StudentPageComponent },
  {
    path: 'students/:id',
    component: StudentDetailComponent,
    canActivate: [StudentsGuard],
    resolve: {
      student: StudentDetailsResolverService
    }
  },

  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  // catch all the other routes
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
