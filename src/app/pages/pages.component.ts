import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  ATRIBUTE_MINISTERIO = environment.ATRIBUTE_MINISTERIO;
  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {


  }

}
