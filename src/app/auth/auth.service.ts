import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    #firebaseSignUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
    #firebaseLoginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
    #firebaseApiKey = 'AIzaSyD3pzumcdmDzqTF0AxnFFyKBmu8Q3wgx8E';
    #signUpWithEmailUrl: string;
    #signInWithEmailUrl: string;
    #user: User;
    #expireTimer = null;
    public userSubj = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient, private router: Router) {
        this.#signUpWithEmailUrl = this.#firebaseSignUpUrl.replace('[API_KEY]', this.#firebaseApiKey);
        this.#signInWithEmailUrl = this.#firebaseLoginUrl.replace('[API_KEY]', this.#firebaseApiKey)
    }

    get userToken(): string | null {
        return this.#user?.token || null;
    }

    signUpEmail(email: string, password: string) {
        return this.http.post<AuthResponse>(this.#signUpWithEmailUrl, {email, password, returnSecureToken: true})
            .pipe(tap(res => this.onSignInSuccess(res)))
            .pipe(catchError(err => {
                const errMsg = err?.error?.error?.message || 'Unknown error!'
                switch (errMsg) {
                    case 'EMAIL_EXISTS':
                        throw('This email exists already!');
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        throw('Too many failed attempts, try later again!');
                    default:
                        throw(errMsg);
                }
            }))
    }

    signInEmail(email: string, password: string) {
        return this.http.post<AuthResponse>(this.#signInWithEmailUrl, {email, password, returnSecureToken: true})
            .pipe(tap(res => this.onSignInSuccess(res)))
            .pipe(catchError(err => {
                const errMsg = err?.error?.error?.message || 'Unknown error!'
                switch (errMsg) {
                    case 'INVALID_LOGIN_CREDENTIALS':
                        throw('Invalid email or password!');
                    case 'EMAIL_NOT_FOUND':
                        throw('Invalid email!');
                    case 'INVALID_PASSWORD':
                        throw('Invalid password!');
                    case 'USER_DISABLED':
                        throw('User has been disabled!');
                    default:
                        throw(errMsg);
                }
            }))
    }

    onSignInSuccess(authResponse: AuthResponse) {
        this.#user = new User(
            authResponse.localId,
            authResponse.email,
            authResponse.idToken,
            new Date(new Date().getTime() + (+authResponse.expiresIn * 1000))
    )
        this.userSubj.next(this.#user);
        localStorage.setItem('authUser', JSON.stringify(this.#user));
        this.autoSignOut(+authResponse.expiresIn * 1000);
    }

    signOut(): void {
        this.#user = null;
        this.userSubj.next(this.#user);
        localStorage.removeItem('authUser');
        clearTimeout(this.#expireTimer);
        this.#expireTimer = null;
        this.router.navigate(['/auth']);
    }

    autoSignIn() {
        const userJSON = localStorage.getItem('authUser');
        if (!userJSON) return;
        const {id, email, _token, _tokenExpirationDate} = JSON.parse(userJSON);
        const storedUser = new User(id, email, _token, new Date(_tokenExpirationDate));
        if (storedUser.token) {
            this.#user = storedUser;
            this.userSubj.next(this.#user);
            this.autoSignOut(this.#user.getValidMilliSeconds());
        } else {
            this.signOut();
        }
    }

    autoSignOut(expireInMilliSeconds: number) {
        clearTimeout(this.#expireTimer);
        this.#expireTimer = setTimeout(() => {
            this.signOut();
        }, expireInMilliSeconds);
    }
}

