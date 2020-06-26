import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Customer>;
    public currentUser: Observable<Customer>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Customer {
        return this.currentUserSubject.value;
    }
}
