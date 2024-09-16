import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
    const router = inject(Router);
    const authService = inject(AuthService);
    if (authService.userToken) return true;
    return router.lastSuccessfulNavigation ? false : router.createUrlTree(['/auth'])
}
