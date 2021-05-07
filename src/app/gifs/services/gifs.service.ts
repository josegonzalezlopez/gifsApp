import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'mFCwJAaEoXM2eR3VM1ennjQ4RbuAR4wu';

  public resultados: Gif[] = [];

  constructor(private _http: HttpClient){

  }

  get hitorial(){
    return [...this._historial]
  }

  buscarGifs( query: string ){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
    }

    this._http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=mFCwJAaEoXM2eR3VM1ennjQ4RbuAR4wu&q=${query}&lang=es&limit=10`)
    .subscribe((response) =>{
      console.log(response.data);
      this.resultados = response.data;
    });

    console.log(this._historial);
  }

}
