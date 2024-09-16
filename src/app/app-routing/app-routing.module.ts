import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipes/recipes.component";
import {ShoppingListComponent} from "../shopping/shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "../recipes/recipe-detail/recipe-detail.component";
import {CrapComponent} from "../crap/crap.component";
import {RecipeEditComponent} from "../recipes/recipe-edit/recipe-edit.component";
import {recipeResolveFn} from "../shared/resolvers";
import {AuthComponent} from "../auth/auth.component";
import {authGuard} from "../auth/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    {
        path: 'recipes', component: RecipesComponent, resolve: [recipeResolveFn], canActivate: [authGuard], children: [
            {path: '', component: RecipeDetailComponent},
            {path: 'new', component: RecipeEditComponent,},
            {path: ':id', component: RecipeDetailComponent,},
            {path: ':id/edit', component: RecipeEditComponent,},
        ]
    },
    {path: 'shoppinglist', component: ShoppingListComponent, canActivate: [authGuard]},
    {path: 'auth', component: AuthComponent},
    {path: 'crap', component: CrapComponent},
    {path: '**', redirectTo: 'crap'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

