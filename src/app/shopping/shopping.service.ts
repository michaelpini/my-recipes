import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingService {
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];
    changed = new Subject<Ingredient[]>();
    startedEditing= new Subject<number>();

    constructor () { }
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
      return this.ingredients[index];
    }

    add(name: string, amount: number): void
    add(ingredient: Ingredient): void
    add(ingredients: Ingredient[]): void
    add(p1: string | Ingredient | Array<Ingredient>, p2?: number) {
        if (Array.isArray(p1)) {
            this.ingredients.push(...p1);
        }
        else if (typeof p1 === 'object') {
            this.ingredients.push(p1);
        } else {
            this.ingredients.push(new Ingredient(p1, p2));
        }
        this.changed.next(this.getIngredients());
    }

    edit(ingredient: Ingredient, index: number) {
      this.ingredients[index] = ingredient;
      this.changed.next(this.getIngredients());
    }

    delete(index: number) {
      this.ingredients.splice(index, 1);
      this.changed.next(this.getIngredients());
    }

}
