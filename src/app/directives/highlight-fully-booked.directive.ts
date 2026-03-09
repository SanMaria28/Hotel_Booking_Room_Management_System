import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightFullyBooked]',
  standalone: false
})
export class HighlightFullyBookedDirective implements OnChanges {
  @Input('appHighlightFullyBooked') isBooked: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.isBooked) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
    }
  }
}
