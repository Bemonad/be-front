import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

export interface BookingData {
  user: string;
  room?: string;
  start?: number;
  end?: number;
  sit?: boolean;
  video?: boolean;
  number_people?: number;
  status?: boolean;
  weekNumber: number;
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  registerBook(bookData) {
    return this.http.post(`${environment.API_URL}/bookings`, bookData);
  }

  getMyBookings(user) {
    return this.http.get(`${environment.API_URL}/bookings/?user=${user._id}`);
  }

  getAllBookings() {
    return this.http.get(`${environment.API_URL}/bookings`);
  }
}
