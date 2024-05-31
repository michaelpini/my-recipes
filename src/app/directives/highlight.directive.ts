import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[highlight-hover]',
})
export class HighlightHover implements OnInit {
    private el: HTMLElement;
    private originalValue: string;
    @Input('highlight-hover') highlightColor: string = 'yellow';
    @HostBinding('style.backgroundColor') bgColor: string;
        
    constructor(private elRef: ElementRef) {};

    ngOnInit(): void {
        this.el = this.elRef.nativeElement;
    }

    @HostListener('mouseenter') mouseEnter(e: MouseEvent) {
        this.originalValue = this.el.style.backgroundColor;
        this.bgColor = this.highlightColor;
    }
    @HostListener('mouseleave') mouseLeave(e: MouseEvent) {
        this.bgColor = this.originalValue;
    } 
}