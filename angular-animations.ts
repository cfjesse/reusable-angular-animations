import { animate, query, stagger, state, style,  transition, trigger} from '@angular/animations';

interface AnimationSettings {
  enter?: string;
  leave?: string;
  name?: string;
}

const animationDefault = '0.5s';

export function ListFade(settings?: AnimationSettings) {
  return trigger(settings && settings.name || 'listFade', [
    transition('* => *', [
      query(
        ':leave',
        [stagger(100, [animate(settings && settings.leave || animationDefault, style({ opacity: 0, height: 0, 'overflow-y': 'hidden'}))])],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger(100, [animate(settings && settings.enter || animationDefault, style({ opacity: 1, height: '*', 'overflow-y': 'hidden'}))])
        ],
        { optional: true }
      )
    ])
  ]);
}

export function Fade(settings?: AnimationSettings) {
  return trigger(
      settings && settings.name  || 'fade', [
      transition(':enter', [
        style({height: 0, opacity: 0, 'overflow-y': 'hidden'}),
        animate(settings && settings.enter || animationDefault, style({height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({height: '*', opacity: 1, 'overflow-y': 'hidden'}),
        animate(settings && settings.leave || animationDefault, style({height: 0, opacity: 0}))
      ])
    ]
  );
}

export function FadeInOut(settings?: AnimationSettings) {
  return trigger(
      settings && settings.name  || 'fadeInOut', [
      transition(':enter', [
        style({opacity: 0, 'overflow-y': 'hidden'}),
        animate(settings && settings.enter || animationDefault, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1, 'overflow-y': 'hidden'}),
        animate(settings && settings.leave || animationDefault, style({ opacity: 0}))
      ])
    ]
  );
}

export function ListAnimation() {

  return trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter',
        [
          style({ opacity: 0, transform: 'scale(.5)' }),
          stagger('60ms', animate('600ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })))
        ],
        { optional: true }
      ),
      query(':leave',
        animate('200ms', style({ opacity: 0, transform: 'scale(.5)' })),
        { optional: true }
      )
    ])
  ]);


}

export function Reveal(settings?: { name?: string; enter: string; scaleIn?: boolean, select?: string; }) {
  return trigger(settings.name || 'reveal', [
    transition(':enter', [
      query(settings.select || 'i', [
        style({opacity: 0, transform: settings.scaleIn ? 'scale(.2)' : 'scale(3)' }),
        animate(settings.enter || animationDefault, style({ opacity: 1, transform: 'none' }))
      ], { optional: true }),
    ]),
    transition(':leave', [
      style({opacity: 1 }),
      animate(animationDefault, style({ opacity: 0 }))
    ])
  ]);
}
