import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { RegisterCompleteComponent } from './register-complete';
import { AuthGuard } from './_helpers';
import { AddCustomerComponent } from './addCustomer/addCustomer.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'addCustomer', component: AddCustomerComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register-complete', component: RegisterCompleteComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
