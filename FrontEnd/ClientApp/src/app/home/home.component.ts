import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, CustomerService } from '../_services';
import { Observable } from 'rxjs';
import { Customer } from '../_models/customer';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    customers: Array<Customer>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private customerService: CustomerService,
    ) {
    }

    ngOnInit() {
        this.loadCustomers();
    }

    // Convenient getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    loadCustomers() {
        /*
        this.customerService.getCustomers().subscribe((customers) => {
            this.customers = customers;
        },
        error => {
            console.log('Error: ' + error);
        });
        */
       this.customerService.getUnknown().subscribe(result => {
        this.customers = result;
       });
    }

    onSubmit() {
        this.submitted = true;

        this.loading = true;

        this.router.navigate(['../', 'addCustomer']);
    }
}
