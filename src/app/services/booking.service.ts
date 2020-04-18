import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface BookingData {
  user_id: any;
  id_room?: string;
  start?: number;
  end?: number;
  sit?: boolean;
  video?: boolean;
  number_people?: number;
  status?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  registerBook(bookData) {
    this.http.post(`${environment.API_URL}/bookings`, bookData).subscribe( response =>
      console.log(response)
    );
  }
}
