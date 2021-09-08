export default [
  {
    id: 1,
    firstname: 'Alain',
    lastname: 'Verse',
    profil_image: '1.jpg',
    city: 'Rennes(35)',
    plays: [
      { id: 1, instrument: 'Saxophone', level: 'Avancé' },
      { id: 2, instrument: 'Trompette', level: 'Intermédiaire' },
    ],
    styles: [{ id: 1, music_name: 'Jazz' }],
  },
  {
    id: 2,
    firstname: 'Cécile',
    lastname: 'Hon',
    profil_image: '2.jpg',
    city: 'Paris(75)',
    plays: [
      { id: 3, instrument: 'Harpe', level: 'Avancé' },
      { id: 4, instrument: 'Piano', level: 'Débutant' },
    ],
    styles: [{ id: 2, music_name: 'Musique classique' }, { id: 3, music_name: 'Folk' }],
  },
  {
    id: 3,
    firstname: 'Anna',
    lastname: 'Tomie',
    profil_image: '3.jpg',
    city: 'Tours(37)',
    plays: [
      { id: 5, instrument: 'Chant', level: 'Avancé' },
      { id: 6, instrument: 'Hang', level: 'Débutant' },
    ],
    styles: [{ id: 4, music_name: 'Gospel' }, { id: 5, music_name: 'Ambient' }],
  },
  {
    id: 4,
    firstname: 'Guy',
    lastname: 'Tar',
    profil_image: '4.jpg',
    city: 'Lille(59)',
    plays: [
      { id: 7, instrument: 'Guitare', level: 'Avancé' },
      { id: 8, instrument: 'Basse', level: 'Débutant' },
    ],
    styles: [{ id: 6, music_name: 'Folk' }, { id: 7, music_name: 'Rock' }, { id: 8, music_name: 'Bluegrass' }],
  },
];
