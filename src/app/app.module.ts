import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListComponent} from './shopping/shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from './shopping/shopping-list-edit/shopping-list-edit.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipes/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {CrapComponent} from './crap/crap.component';
import {CrapChildComponent} from './crap/crap-child/crap-child-component';
import {HighlightHover} from './directives/highlight.directive';
import {IfNotDirective} from './directives/if-not.directive';
import {HideIfDirective} from './directives/hide-if.directive';
import {DropdownDirective} from './directives/dropdown.directive';
import {ToggleClassDirective} from './directives/toggle-class.directive';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {NgOptimizedImage} from "@angular/common";
import {ShortenPipe} from "./shared/shorten.pipe";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ShoppingListEditComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        CrapComponent,
        CrapChildComponent,
        HighlightHover,
        IfNotDirective,
        HideIfDirective,
        DropdownDirective,
        ToggleClassDirective,
        RecipeEditComponent,
        ShortenPipe,
        CrapChildComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
