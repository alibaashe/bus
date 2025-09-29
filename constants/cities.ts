export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
}

export const cities: City[] = [
  {
    id: '1',
    name: 'Hargeisa',
    country: 'Somalia',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Borama',
    country: 'Somalia',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Burco',
    country: 'Somalia',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Berbera',
    country: 'Somalia',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Wajaale',
    country: 'Somalia',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    name: 'Mogadishu',
    country: 'Somalia',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  }
];

export const popularRoutes = [
  {
    id: '1',
    from: cities[1], // Borama
    to: cities[0], // Hargeisa
    isPopular: true
  },
  {
    id: '2',
    from: cities[0], // Hargeisa
    to: cities[2], // Burco
    isPopular: true
  },
  {
    id: '3',
    from: cities[2], // Burco
    to: cities[0], // Hargeisa
    isPopular: true
  },
  {
    id: '4',
    from: cities[0], // Hargeisa
    to: cities[3], // Berbera
    isPopular: true
  },
  {
    id: '5',
    from: cities[4], // Wajaale
    to: cities[0], // Hargeisa
    isPopular: true
  }
];