import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipes = [
        new Recipe(
            'A test recipe', 
            'This is a test',
            'https://ww2.bettybossi.ch/static/rezepte/x/bb_bbzc190315_0014a_x.jpg',
            [
                {name: 'apples', amount: 4},
                {name: 'melon', amount: 1},
            ],
            'r1'
        ),
        new Recipe(
            'Another test recipe', 'This is yet another a test', 
            'https://www.bettybossi.ch/static/rezepte/x/bb_gus7191227_0180b_x.jpg',
            [
                {name: 'potatoes', amount: 10},
                {name: 'tomatoes', amount: 13},
            ],
            'r2'
        )
    ];

    getRecipe(id?: string): Recipe | null {
        return this.recipes.find( x => x.id === id) || null;
    }
    delete(id: string): number {
        const index = this.recipes.findIndex(x => x.id === id);
        if (index > -1) {
            this.recipes.splice(index, 1);
            return this.recipes.length;
        }        
        return -1;
    }

}