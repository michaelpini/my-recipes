import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import {setBrokenImage} from "../../shared/util";

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  protected setBrokenImage = setBrokenImage;

  @Input() recipe: Recipe;

}
