import { Routes } from '@angular/router';
import { PetListComponent } from './components/pet/pet-list/pet-list.component';
import { PetFormComponent } from './components/pet/pet-form/pet-form.component';
import { PetCardComponent } from './components/pet/pet-card/pet-card.component';
import { AppointmentFormComponent } from './components/appointment/appointment-form/appointment-form.component';
import { AppointmentListComponent } from './components/appointment/appointment-list/appointment-list.component';
import { AppointmentCardComponent } from './components/appointment/appointment-card/appointment-card.component';
import { HomeComponent } from './components/common/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'pets', component: PetListComponent },
    { path: 'pets/details', component: PetCardComponent },
    { path: 'pets/create', component: PetFormComponent },
    { path: 'appointments', component: AppointmentListComponent },
    { path: 'appointments/details', component: AppointmentCardComponent },
    { path: 'appointments/create', component: AppointmentFormComponent },
    { path: '**', redirectTo: 'home' }

];
