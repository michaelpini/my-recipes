import { Component, OnDestroy, OnInit } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingService } from "../shopping.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    shoppingSub: Subscription;

    constructor(private shoppingService: ShoppingService) { }

    ngOnInit(): void {
        this.ingredients = this.shoppingService.getIngredients();
        this.shoppingSub = this.shoppingService.changed.subscribe(p => this.ingredients = p)
    }
    ngOnDestroy(): void {
        this.shoppingSub.unsubscribe();
    }

    onEditItem(index: number) {
      this.shoppingService.startedEditing.next(index);
    }

}
