export interface Bus {
  id: string;
  name: string;
  price: number;
  currency: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  amenities: string[];
  image: string;
  availableSeats: number;
  totalSeats: number;
}

export interface BusSchedule {
  id: string;
  fromCityId: string;
  toCityId: string;
  date: string;
  buses: Bus[];
}

export const busSchedules: BusSchedule[] = [
  {
    id: '1',
    fromCityId: '0', // Hargeisa
    toCityId: '1', // Borama
    date: '2025-09-20',
    buses: [
      {
        id: 'SAHAL180',
        name: 'SAHAL 180',
        price: 65000,
        currency: 'SHL',
        departureTime: '07:30 AM',
        arrivalTime: '09:30 AM',
        duration: '02:00',
        amenities: ['AC', 'WIFI'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
        availableSeats: 12,
        totalSeats: 14
      },
      {
        id: 'SAHAL133',
        name: 'SAHAL 133',
        price: 65000,
        currency: 'SHL',
        departureTime: '08:45 AM',
        arrivalTime: '10:45 AM',
        duration: '02:00',
        amenities: ['AC', 'WIFI'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
        availableSeats: 8,
        totalSeats: 14
      },
      {
        id: 'SAHAL127',
        name: 'SAHAL 127',
        price: 65000,
        currency: 'SHL',
        departureTime: '10:15 AM',
        arrivalTime: '12:15 PM',
        duration: '02:00',
        amenities: ['AC', 'WIFI'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
        availableSeats: 14,
        totalSeats: 14
      }
    ]
  }
];

export const seatLayout = [
  { id: 1, row: 1, position: 'right', isAvailable: true },
  { id: 2, row: 2, position: 'left', isAvailable: true },
  { id: 3, row: 2, position: 'center', isAvailable: true },
  { id: 4, row: 2, position: 'right', isAvailable: true },
  { id: 5, row: 3, position: 'left', isAvailable: true },
  { id: 6, row: 3, position: 'center', isAvailable: true },
  { id: 7, row: 3, position: 'right', isAvailable: true },
  { id: 8, row: 4, position: 'left', isAvailable: true },
  { id: 9, row: 4, position: 'center', isAvailable: true },
  { id: 10, row: 4, position: 'right', isAvailable: true },
  { id: 11, row: 5, position: 'left', isAvailable: true },
  { id: 12, row: 5, position: 'center', isAvailable: true },
  { id: 13, row: 5, position: 'right', isAvailable: true },
  { id: 14, row: 5, position: 'right2', isAvailable: true }
];

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'zaad',
    name: 'Zaad',
    icon: '💳',
    color: '#f97316'
  },
  {
    id: 'edahab',
    name: 'Edahab',
    icon: '💳',
    color: '#3b82f6'
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: '💳',
    color: '#10b981'
  }
];