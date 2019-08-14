import { trigger, state, style, animate, transition } from '@angular/animations';

export const Animations = {
    noti: trigger('noti', [
        state('void', style({
            left: '-100%'
        })),
        state('*', style({
            left: '10px'
        })),
        transition('void <=> *', animate('0.3s cubic-bezier(.8,.76,.28,1.05)'))
    ]),

}