import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _gifsService: GifsService) { }

  get historial(){
    return this._gifsService.hitorial;
  }

  ngOnInit(): void {
  }

  buscar(item: string){
    this._gifsService.buscarGifs(item);
  }

}
