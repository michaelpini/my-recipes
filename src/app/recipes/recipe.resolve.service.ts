import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {StorageService} from "../shared/storage.service";
import {tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeResolveService implements Resolve<Recipe[]> {
    constructor(private recipeService: RecipeService, private storageService: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Recipe[]> {
            return this.storageService.getAllRecipes()
                .pipe(tap(res => {
                    this.recipeService.setRecipes(res);
                }))

    }

}

