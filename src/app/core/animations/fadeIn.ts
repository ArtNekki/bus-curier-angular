import {animate, style, transition, trigger} from '@angular/animations';

export default trigger('fadeIn', [
  transition('void => *', [
    style({opacity: 0}),
    animate('250ms')
  ])
]);
