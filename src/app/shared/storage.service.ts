import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {forkJoin, map, Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    baseUrl = 'https://my-recipes-440db-default-rtdb.europe-west1.firebasedatabase.app/'
    constructor(private http: HttpClient) { }

    getAllRecipes() {
        return this.http.get<{ [id: string]: Recipe} >(this.baseUrl + 'recipes.json')
            .pipe(map(res => {
                if (!res) return [];
                return Object.entries(res).map(([key, val]) => {
                    return (this.cleanRecipe(val, key));
                })
            }))
    }

    getRecipe(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(this.baseUrl + `recipes/${id}.json`)
            .pipe(map(res => {
                return (this.cleanRecipe(res, id));
            }))
    }

    saveAllRecipes(recipes: Recipe[]) {
        return this.http.put(this.baseUrl + 'recipes.json', recipes)

    }

    addRecipe(recipe: Recipe) {
        return this.http.post<{name: string}>(this.baseUrl + 'recipes.json', recipe, {})
            .pipe(map(res => {
                return this.cleanRecipe(recipe, res.name);
            }))
    }

    addRecipes(recipes: Recipe[]) {
        return forkJoin(
            recipes.map(
                (recipe: Recipe) => this.addRecipe(recipe),
            )
        )
    }

    updateRecipe(recipe: Recipe) {
        let {id, ...recipeNoId} = recipe;
        if (!id) return throwError(() => new Error('Cannot update recipe without id'));
        return this.http.put<Recipe>(this.baseUrl + `recipes/${id}.json`, recipeNoId, {})
            .pipe(map(res => {
                return recipe;
            }))
    }

    deleteRecipe(id: string) {
        return this.http.delete<string>(this.baseUrl + `recipes/${id}.json`)
    }

    private cleanRecipe(recipe: Recipe, id: string) {
        return {...recipe, id, ingredients: recipe.ingredients || []}
    }

}
