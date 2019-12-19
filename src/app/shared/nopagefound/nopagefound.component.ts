import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.css']
})
export class NopagefoundComponent implements OnInit {
  ATRIBUTE_MINISTERIO = environment.ATRIBUTE_MINISTERIO;
  anio: number = new Date().getFullYear();
  constructor(private location: Location) { }

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}
