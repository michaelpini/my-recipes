import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ShoppingService} from '../../shopping/shopping.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
    private no_recipe: Recipe = {
        id: '',
        name: 'Select recipe...',
        description: 'Select a recipe from the list first',
        imagePath: '../../../assets/not_found.jpg',
        ingredients: []
    }
    recipe: Recipe = this.no_recipe;


    constructor(
        private recipeService: RecipeService,
        private shoppingService: ShoppingService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.recipe = this.recipeService.getRecipe(params.id) || this.no_recipe;
        })
    }

    addToShoppingList() {
        this.shoppingService.add(this.recipe.ingredients);
    }

    delete() {
        if (confirm(`Delete recipe ${this.recipe.name} ?`)) {
            this.recipeService.delete(this.recipe.id);
            this.router.navigate(['../'], {relativeTo: this.route});
        }
    }


}
