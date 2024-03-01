import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSeviceService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemon(infForSearch: any): Observable<any> {
    // Utiliza el método get del HttpClient para realizar una solicitud GET a la URL de la PokeAPI con el ID del Pokémon.
    return this.http.get(this.apiUrl+"pokemon/"+infForSearch);
  }
}
