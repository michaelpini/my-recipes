import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent implements AfterViewInit {
    isLoginMode = true;
    isPasswordHidden = true;
    isBusy = false;
    error = '';
    @ViewChild('form', {static: false}) form: NgForm;

    constructor(
        private authService: AuthService,
        private location: Location,
    ) { }

    ngAfterViewInit(): void {
        this.form.valueChanges.subscribe(selectedValue => {
            this.error = '';
        })
    }

    get text(): { loginBtn: string, toggleBtn: string, title: string } {
        return (this.isLoginMode) ?
            {
                loginBtn: 'Log In',
                toggleBtn: 'Create Account instead',
                title: 'Login to Application'
            } : {
                loginBtn: 'Sign Up',
                toggleBtn: 'Go to Login',
                title: 'Create New User Account '
            }
    }

    toggleLoginMode() {
        this.error = '';
        return this.isLoginMode = !this.isLoginMode;
    }

    togglePasswordHidden() {
        this.isPasswordHidden = !this.isPasswordHidden;
    }

    submit(form: NgForm): void {
        const {email, password} = form.value;
        if (this.isLoginMode) {
            this.authenticate(this.authService.signInEmail(email, password));
        } else {
            this.authenticate(this.authService.signUpEmail(email, password));
        }
    }

    authenticate(authObs: Observable<AuthResponse>): void {
        this.isBusy = true;
        authObs.subscribe({
            next: (res: AuthResponse) => {
                console.log(res);
                // this.router.navigate(['/recipes']);
                this.location.back();
                this.isBusy = false;
                this.error = '';
            },
            error: errMsg => {
                this.isBusy = false;
                this.error = errMsg;
            }
        })
    }

}
