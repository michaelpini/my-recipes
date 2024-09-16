import {ActivatedRouteSnapshot, MaybeAsync, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../recipes/recipe.model";
import {tap} from "rxjs";
import {inject} from "@angular/core";
import {StorageService} from "./storage.service";
import {RecipeService} from "../recipes/recipe.service";

export const recipeResolveFn: ResolveFn<Recipe[]> =
    ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Recipe[]> => {
    const storageService = inject(StorageService);
    const recipeService = inject(RecipeService);
    if (recipeService.recipes.length > 0) {
        return recipeService.getRecipes();
    }
    return storageService.getAllRecipes()
        .pipe(tap(res => {
            recipeService.setRecipes(res);
        }))
}
