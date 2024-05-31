import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "../recipes/recipes.component";
import { ShoppingListComponent } from "../shopping/shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { CrapComponent } from "../crap/crap.component";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeDetailComponent},
    {path: 'edit', component: RecipeEditComponent,},
  ]},
  {path: 'shoppinglist', component: ShoppingListComponent},
  {path: 'crap', component: CrapComponent},
  {path: '**', redirectTo: 'crap'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

