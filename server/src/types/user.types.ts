export interface BookedVisit {
  id: number;
  date: string;
}

export interface User {
  id: number;
  email: string;
  bookedVisits?: BookedVisit[];
  favResidenciesID?: number[];
}

export interface BookingRequest {
  email: string;
  date: string;
}

export interface UserEmailRequest {
  email: string;
}

export interface FavoriteRequest {
  email: string;
}