import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/recipes')) return next.handle(req);
        let modifiedReq = req.clone({
            params: new HttpParams().set('auth', this.authService.userToken)
            }
        )
        return next.handle(modifiedReq);
    }
}
