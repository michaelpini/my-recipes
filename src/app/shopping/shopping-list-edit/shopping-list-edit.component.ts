import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) editForm: NgForm;
  subscription: Subscription;
  editedIndex = -1;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(index => {
      this.editedIndex = index;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.editForm.setValue(this.editedItem);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editedIndex > -1) {
      this.shoppingService.edit(newIngredient, this.editedIndex);
    } else {
      this.shoppingService.add(newIngredient);
    }
    this.onClear();
  }

  onDeleteItem() {
    this.shoppingService.delete(this.editedIndex);
    this.onClear();
  }

  onClear(): void {
    this.editForm.reset();
    this.editedIndex = -1
    this.editedItem = null;
  }

}
