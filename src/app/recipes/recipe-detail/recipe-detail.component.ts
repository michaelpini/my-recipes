import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ShoppingService} from '../../shopping/shopping.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {setBrokenImage} from '../../shared/util'
import {StorageService} from "../../shared/storage.service";

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
        imagePath: '',
        ingredients: []
    }
    recipe: Recipe = this.no_recipe;
    protected setBrokenImage = setBrokenImage;


    constructor(
        private recipeService: RecipeService,
        private storageService: StorageService,
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
            this.storageService.deleteRecipe(this.recipe.id)
                .subscribe({
                    next: res => {
                        this.recipeService.delete(this.recipe.id);
                        const firstId = this.recipeService.getFirstId();
                        this.router.navigate(['../' + firstId], {relativeTo: this.route});
                    },
                    error: err => {alert('Error deleting recipe');}
                })
        }
    }

}
