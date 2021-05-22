import {animate, style, transition, trigger} from '@angular/animations';

export default trigger('dropdown', [
  transition('void => *', [
    style({opacity: 0}),
    animate('200ms')
  ])
])
