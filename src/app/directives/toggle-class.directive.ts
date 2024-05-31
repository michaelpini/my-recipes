import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[toggleClass]'
})
export class ToggleClassDirective {
    private el: HTMLElement;
    private _className:string; 
    constructor(elRef: ElementRef, private renderer: Renderer2 ) {
        this.el = elRef.nativeElement;
    }

    @Input('toggleClass') set className(value: string) { this._className = value || 'open'};
    @HostListener('document:click', ['$event']) toggle(e: MouseEvent) { 
        if (this.el.classList.contains(this._className) ||
           !this.el.contains(e.target as Node)) {
            this.renderer.removeClass(this.el, this._className);
        } else {
            this.renderer.addClass(this.el, this._className)
        }
    }
}