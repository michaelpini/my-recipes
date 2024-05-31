import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: string;
  recipe: Recipe;
  no_image = '../../../assets/not_found.jpg'

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const recipe = this.recipeService.getRecipe(params.id);
      this.recipe = recipe ? {...recipe} : new Recipe();
    })
    
  }
}
