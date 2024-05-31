import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements AfterViewInit {
  @ViewChild('form') formRef: ElementRef;
  @ViewChild('nameInput') nameRef: ElementRef;
  @ViewChild('amountInput') amountRef: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngAfterViewInit(): void {
    (this.formRef.nativeElement as HTMLFormElement)
    .addEventListener('submit', this.onButtonAddSubmit.bind(this));
  } 

  onButtonAddSubmit(e: Event) {
    e.preventDefault();
    const name = (this.nameRef.nativeElement as HTMLInputElement).value;
    const amount = +(this.amountRef.nativeElement as HTMLInputElement).value;
    this.shoppingService.add(name, amount);
  }
  onFormSubmit(name: string, amount: string, e: Event) {
    this.shoppingService.add(new Ingredient(name, +amount));
  }

}
