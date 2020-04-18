import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface RoomData {
  _id: string;
  name: string;
  description: string;
  capacity_sit: string;
  capacity_stand: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAllRooms() {
    return this.http.get(`${environment.API_URL}/rooms`);
  }

  getRoom(id) {
    return this.http.get<RoomData>(`${environment.API_URL}/rooms/${id}`);
  }
}
