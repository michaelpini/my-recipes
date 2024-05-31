import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hideIf]'
})
export class HideIfDirective {
  private el: HTMLElement; 
  private originalValue: string;
  
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elRef.nativeElement;
    this.originalValue = this.el.style.display;
   }

  @Input() set hideIf(value: boolean) {   
    if (value) {
      this.originalValue = this.el.style.display;
      this.renderer.setStyle(this.el, 'display', 'none') 
    } else {
      this.renderer.setStyle(this.el, 'display', this.originalValue) 
    }
  }

   // @HostBinding('style.display') to a variable only works if there is no
   // prior markup like <div style="display:flex;" [hideIf]="isHidden"></div>
}
