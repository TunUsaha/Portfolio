import type { Repo } from './types.ts';

export const HOME_CARDS = [
  {
    num: '01',
    tag: 'Curious about',
    title: 'Knowledge Management',
    body: 'How organizations remember, share, and actually act on what they know.',
  },
  {
    num: '02',
    tag: 'Curious about',
    title: 'Applied AI & Machine Learning',
    body: 'Turning messy, real-world data into decisions people can trust.',
  },
  {
    num: '03',
    tag: 'Curious about',
    title: 'Data Storytelling',
    body: 'Making analysis legible — charts and narratives that actually land.',
  },
  {
    num: '04',
    tag: 'Curious about',
    title: 'Sustainable Innovation',
    body: 'From the LeX SP × CMU camps — designing ideas built to last.',
  },
  {
    num: '05',
    tag: 'Curious about',
    title: 'Business & Human Systems',
    body: 'Why processes, people, and incentives behave the way they do.',
  },
  {
    num: '06',
    tag: 'Off the clock',
    title: 'Basketball',
    body: 'A San Antonio Spurs fan for 10 years and counting — drawn to the patient, team-first way they play the game.',
  },
];

export const JOURNEY = [
  {
    num: '01',
    year: '2026',
    accent: true,
    title: 'Where it started',
    body: "B.S. in Modern Management Information Technology at Chiang Mai University — the place where I learned that the interesting problems live between the business and the system, not inside either one. A class project taught me how small improvements in systems can create meaningful business impact.",
  },
  {
    num: '02',
    year: 'Now',
    accent: false,
    title: 'Choosing knowledge',
    body: 'Pursuing an M.S. in Knowledge & Innovation Management. I chose it because during my internship, I saw that knowledge management was one of the key challenges in organizations, yet it was often overlooked. It made me keep asking: how can organizations turn what they know into something that creates lasting value?',
  },
  {
    num: '03',
    year: "What's next",
    accent: false,
    title: "What I'm chasing",
    body: 'Currently exploring my curiosity and building on ideas from my undergraduate project, with a focus on creating value through knowledge and technology.',
  },
];

export const SKILLS = [
  {
    title: 'Business Analysis',
    tags: [
      'Requirements',
      'Process mapping',
      'CRM',
      'UI/UX Wireframing',
      'System Testing & QA',
      'Technical Documentation',
      'User Training',
      'Post-Implementation Support',
    ],
  },
  {
    title: 'Research & AI',
    tags: ['Machine learning', 'Data preprocessing', 'Academic writing'],
  },
  {
    title: 'Technical Tools',
    tags: [
      'Python',
      'SQL',
      'Git',
      'PHP',
      'JavaScript',
      'HTML',
      'CSS',
      'Power BI',
      'Excel',
      'Figma',
    ],
  },
];

export const OFF_CLOCK = [
  { label: 'Currently learning', value: 'UX/UI and Knowledge Management' },
  { label: 'Always up for', value: 'A challenge.' },
  { label: 'Can talk for hours about', value: 'Basketball' },
  {
    label: "Off-screen, you'll find me",
    value: 'Walking around Ang Kaew Reservoir, just taking in the moment.',
  },
];

export const CERT_CARDS = [
  {
    id: 'cert-lex-1',
    title: 'LeX SP × CMU — Cohort 1',
    sub: 'Sustainable Innovation Camp · participation',
    src: '/images/cert-lex-1.webp',
  },
  {
    id: 'cert-lex-2',
    title: 'LeX SP × CMU — Cohort 2',
    sub: 'Sustainable Innovation Camp · participation',
    src: '/images/cert-lex-2.webp',
  },
  {
    id: 'cert-award',
    title: 'APacCHRIE 2025',
    sub: 'Award certificate',
    src: '/images/cert-award.webp',
  },
];

export function fallbackRepos(): Repo[] {
  return [
    {
      name: '[repo-name]',
      description: 'Business analysis tooling.',
      language: 'Python',
      stars: 0,
      url: '#',
      updated: '2025',
    },
    {
      name: '[repo-name]',
      description: 'ML / data preprocessing notebook.',
      language: 'Jupyter Notebook',
      stars: 0,
      url: '#',
      updated: '2025',
    },
    {
      name: '[repo-name]',
      description: 'Web portfolio source.',
      language: 'JavaScript',
      stars: 0,
      url: '#',
      updated: '2025',
    },
    {
      name: '[repo-name]',
      description: 'Research script.',
      language: 'Python',
      stars: 0,
      url: '#',
      updated: '2024',
    },
    {
      name: '[repo-name]',
      description: 'Coursework / experiment.',
      language: 'TypeScript',
      stars: 0,
      url: '#',
      updated: '2024',
    },
    {
      name: '[repo-name]',
      description: 'Sustainable innovation camp project.',
      language: 'Other',
      stars: 0,
      url: '#',
      updated: '2024',
    },
  ];
}
