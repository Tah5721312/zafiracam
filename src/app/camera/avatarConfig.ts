import { Avatar } from './types';

export const avatars: Avatar[] = [
  {
    id: 'man',
    name: 'Classic Man',
    image: '/avatars/man.png',
    faceArea: {
      x: 125,
      y: 110,
      width: 150,
      height: 180,
      rotate: 0,
    },
  },
  {
    id: 'woman',
    name: 'Elegant Woman',
    image: '/avatars/woman.png',
    faceArea: {
      x: 130,
      y: 115,
      width: 140,
      height: 170,
      rotate: 0,
    },
  },
];

export const DEFAULT_AVATAR = avatars[0];
