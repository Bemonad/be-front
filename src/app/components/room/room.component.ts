import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService, RoomData } from '../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  private roomId: string;
  public room: RoomData;

  constructor(private route: ActivatedRoute, private roomService: RoomService) {
    this.room = {
      name: '',
      description: '',
      capacity_sit: '',
      capacity_stand: '',
    };
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.queryParamMap.get('id');
    this.roomService.getRoom(this.roomId).subscribe( data => {
      this.room = data;
    });
  }

}
