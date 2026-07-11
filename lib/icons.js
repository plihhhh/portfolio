// Ikon SVG (gaya feather) sebagai komponen React.
function Svg({ children, ...props }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconSun = (p) => (
  <Svg {...p}>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
  </Svg>
);

export const IconMoon = (p) => (
  <Svg {...p}>
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </Svg>
);

export const IconPencil = (p) => (
  <Svg {...p}>
    <path d='M12 20h9' />
    <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z' />
  </Svg>
);

export const IconMail = (p) => (
  <Svg {...p}>
    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
    <polyline points='22,6 12,13 2,6' />
  </Svg>
);

export const IconGithub = (p) => (
  <Svg {...p}>
    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
  </Svg>
);

export const IconLinkedin = (p) => (
  <Svg {...p}>
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect x='2' y='9' width='4' height='12' />
    <circle cx='4' cy='4' r='2' />
  </Svg>
);

export const IconUser = (p) => (
  <Svg {...p}>
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </Svg>
);

export const IconImage = (p) => (
  <Svg {...p}>
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
    <circle cx='8.5' cy='8.5' r='1.5' />
    <polyline points='21 15 16 10 5 21' />
  </Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}>
    <polyline points='20 6 9 17 4 12' />
  </Svg>
);

export const IconArrow = (p) => (
  <Svg {...p}>
    <line x1='7' y1='17' x2='17' y2='7' />
    <polyline points='7 7 17 7 17 17' />
  </Svg>
);

export const IconClose = (p) => (
  <Svg {...p}>
    <path d='M18 6L6 18M6 6l12 12' />
  </Svg>
);

export const IconTrash = (p) => (
  <Svg {...p}>
    <polyline points='3 6 5 6 21 6' />
    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
  </Svg>
);

export const IconPlus = (p) => (
  <Svg {...p}>
    <path d='M12 5v14M5 12h14' />
  </Svg>
);
