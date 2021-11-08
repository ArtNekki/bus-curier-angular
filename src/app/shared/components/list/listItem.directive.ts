import {ComponentFactoryResolver, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appListItem]'
})
export class ListItemDirective {

  constructor(
    el: ElementRef,
    private resolver: ComponentFactoryResolver)
  {
    el.nativeElement.classList.add('list__item');
  }

}
