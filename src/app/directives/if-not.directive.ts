import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ifNot]'
})
export class IfNotDirective {

  constructor(
    private templateRef: TemplateRef<any>,        // Reference to the dynamically generated ng-template
    private viewContainerRef: ViewContainerRef    // Reference to the insertion point in the DOM
  ) { }

  // Property setter with alias 'ifNot' used to detect a change in the condition
  @Input('ifNot')  set condition(value: boolean) {
    if (!value) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
