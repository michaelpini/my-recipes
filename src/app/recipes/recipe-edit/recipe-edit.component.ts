import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {getRandomId} from "../../shared/util.js"
import {Subscription} from "rxjs";

@Component({
    selector: 'recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
    recipeForm: FormGroup;
    editMode = false;
    no_image = '../../../assets/not_found.jpg'
    routeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.editMode = params.id != null;
            this.initForm(params.id);
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    onSubmit() {
        const recipe: Recipe = this.recipeForm.value;
        if (this.editMode) {
            this.recipeService.updateRecipe(recipe);
        } else {
            this.recipeService.addRecipe(recipe);
        }
        this.onCancel();
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]),
                id: new FormControl(getRandomId())
            }))
    }

    private initForm(id: string) {
        let recipe = this.recipeService.getRecipe(id) || new Recipe();
        let ingredientsFormArray = new FormArray([]);
        recipe.ingredients.forEach(ingredient => {
            ingredientsFormArray.push(
                new FormGroup({
                    name: new FormControl(ingredient.name, Validators.required),
                    amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]),
                    id: new FormControl(getRandomId()) ,
                })
            )
        })
        this.recipeForm = new FormGroup({
            name: new FormControl(recipe.name, Validators.required),
            imagePath: new FormControl(recipe.imagePath, Validators.required),
            description: new FormControl(recipe.description, Validators.required),
            id: new FormControl(recipe.id),
            ingredients: ingredientsFormArray
        })
    }

    get ingredientsFormArray(): FormArray {
        return (<FormArray>this.recipeForm.get('ingredients'));
    }
    get imagePath() {
        return this.recipeForm.get('imagePath').value;
    }

    getIngredientId(item: any) {
        return item.get('id').value;
    }

    onCancel() {
        this.location.back();
    }

    onDeleteIngredient(index: number) {
        this.ingredientsFormArray.removeAt(index, {emitEvent: false});
    }
}
