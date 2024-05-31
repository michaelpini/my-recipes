import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[dropdown]'
})
export class DropdownDirective {
    el: HTMLElement;
    constructor(private elRef: ElementRef) {
        this.el = elRef.nativeElement;
    }
    @HostBinding('class.open')   // 
    isOpen = false;
    
    @HostListener('document:click', ['$event'])   // Global click listener, provide event as arg to handler 
    handleDocumentClick(e: MouseEvent) {   
        this.isOpen = this.el.contains(e.target as Node) ? !this.isOpen : false; 
    }
}
// only works if the host element does not have the 'open' class set initially