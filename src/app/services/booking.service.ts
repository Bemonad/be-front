import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

export interface BookingData {
  user_id: any;
  id_room?: string;
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

  constructor(private http: HttpClient, private userService: UserService) {
  }

  registerBook(bookData) {
    this.http.post(`${environment.API_URL}/bookings`, bookData).subscribe( response =>
      console.log(response)
    );
  }

  getMyBookings(user) {
    return this.http.get(`${environment.API_URL}/bookings/?user=${user._id}`);
  }
}
