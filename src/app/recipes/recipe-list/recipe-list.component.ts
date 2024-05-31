import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { LoggingService } from "../../shared/logging.service";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    providers: []  // Do not define LoggingService here, but use the parent instance
})
export class RecipeListComponent implements OnInit{
    recipes: Recipe[];

    constructor(
        private loggingService: LoggingService, 
        private recipeService: RecipeService
    ) {  }

    ngOnInit() {
        this.recipes = this.recipeService.recipes;
    }

}