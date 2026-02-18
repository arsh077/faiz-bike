export interface Bike {
    id: string;
    title: string;
    price: string; // Formatted price
    year: number;
    kilometers: string;
    category: 'Scooter' | 'Motorcycle' | 'Cruiser' | 'Sports';
    description: string;
    imageUrl: string;
    condition: string;
    postedTime: string;
}

export interface User {
    name: string;
    email: string;
    phone: string;
    memberSince: string;
}