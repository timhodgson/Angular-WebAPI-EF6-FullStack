import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Customer } from '../_models';

import { AlertService, CustomerService, AuthenticationService } from '../_services';

// Registration form with validation
@Component({
  templateUrl: 'addCustomer.component.html',
  styleUrls: ['addCustomer.component.css']
})
export class AddCustomerComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    // On init, set the validation parameters
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: [
        '',
        [Validators.required, Validators.email, this.EmailValidator('email')]
      ],
      phoneNumber: ['', Validators.required],
      subscribe: [true]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // Compares the 'email' and 'confirm email' to ensure that they match
  EmailValidator(confirmEmailInput: string) {
    let confirmEmailControl: FormControl;
    let emailControl: FormControl;

    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      if (!confirmEmailControl) {
        confirmEmailControl = control;
        emailControl = control.parent.get(confirmEmailInput) as FormControl;
        emailControl.valueChanges.subscribe(() => {
          confirmEmailControl.updateValueAndValidity();
        });
      }

      if (
        emailControl.value.toLocaleLowerCase() !==
        confirmEmailControl.value.toLocaleLowerCase()
      ) {
        return {
          notMatch: true
        };
      }
      return null;
    };
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Transform registration for into User object
    const customer: Customer = new Customer();
    customer.firstName = this.registerForm.value.firstName;
    customer.lastName = this.registerForm.value.lastName;
    customer.emailAddress = this.registerForm.value.email;
    customer.phoneNumber = this.registerForm.value.phoneNumber;

    // tslint:disable-next-line:no-console
    console.debug(JSON.stringify(customer));

    // Call the user service to register the new user
    this.loading = true;
    this.customerService
      .register(1, customer)
      .pipe(first())
      .subscribe(
        data => {
          // Success, go to the thank you page
          this.router.navigate(['/register-complete']);
        },
        error => {
          // Display an error message
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
