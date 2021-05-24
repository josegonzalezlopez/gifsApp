import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'mFCwJAaEoXM2eR3VM1ennjQ4RbuAR4wu';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  constructor(private _http: HttpClient){
      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
      this.resultados = JSON.parse( localStorage.getItem("resultado")!) || [];
  }

  get hitorial(){
    return [...this._historial]
  }

  buscarGifs( query: string ){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
                        .set('api_key', this.apiKey)
                        .set('limit', '10')
                        .set('lang', 'es')
                        .set('q', query);

    this._http.get<SearchGifsResponse>(`${this.apiUrl}/search?`, {params})
    .subscribe((response) =>{
      this.resultados = response.data;
      localStorage.setItem("resultado", JSON.stringify(this.resultados))
    });

    console.log(this._historial);
  }

}
