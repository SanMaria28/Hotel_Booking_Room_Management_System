import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightDiscount]',
  standalone: false
})
export class HighlightDiscountDirective implements OnChanges {
  @Input('appHighlightDiscount') discounted: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.discounted) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#d4edda');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
