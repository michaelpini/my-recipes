import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";
import { StorageService } from "../shared/storage.service";


@Injectable({providedIn: 'root'})
export class RecipeService {
    recipes = [];
    changed = new Subject<Recipe[]>

    constructor(private storageService: StorageService) {}

    populateFromDummyData(){
        fetch('/assets/dummy.data.json').then(res => {
            res.json().then(val => this.recipes );
        });
    }

    getRecipes(): Recipe[] {
      return this.recipes.slice();
    }

    getRecipe(id?: string): Recipe | null {
        return this.recipes.find( x => x.id === id) || null;
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.changed.next(this.getRecipes());
    }

    addRecipes(recipes: Recipe[]): void {
        this.recipes = this.recipes.concat(recipes);
        this.changed.next(this.getRecipes());
    }

    updateRecipe(recipe: Recipe): void {
      const index = this.recipes.findIndex(x => x.id === recipe.id);
      this.recipes[index] = recipe;
      this.changed.next(this.getRecipes());
    }

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.changed.next(this.getRecipes());
    }

    delete(id: string): number {
        const index = this.recipes.findIndex(x => x.id === id);
        if (index > -1) {
            this.recipes.splice(index, 1);
            this.changed.next(this.getRecipes());
            return this.recipes.length;
        }
        return -1;
    }

    saveAll() {
        this.storageService.saveAllRecipes(this.getRecipes())
            .subscribe(res => console.log(res));
    }

    has(id: string): boolean {
        return this.recipes.some(x => x.id === id);
    }
     getFirstId(): string {
        return this.recipes[0]?.id || '';
     }



}
