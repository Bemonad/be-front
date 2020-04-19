import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bemonad-capacities',
  templateUrl: './bemonad-capacities.component.html',
  styleUrls: ['./bemonad-capacities.component.scss']
})
export class BemonadCapacitiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() stand: number;
  @Input() sit: number;
  @Input() centered: boolean;
}
