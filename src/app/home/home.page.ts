import { Component } from '@angular/core';
import { ApiSeviceService } from '../service/api-sevice.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemonInfo: any;
  pokeInformation: any;
  type: string = '';

  constructor(private api: ApiSeviceService, private db:AngularFirestore) {}

  // Método para obtener datos de un Pokémon dado su ID.
  getPokemonDataID(infForSearch: any) {
  
    try {
      // Llama al método getPokemon del servicio y se suscribe al observable.
      this.api.getPokemon(infForSearch).subscribe(
        (response => {
          // Dentro de la función de éxito de la suscripción:
          // Asigna el nombre del Pokémon a la propiedad 'pokemonForId' del componente.
          this.pokeInformation = response;
          this.type = this.pokeInformation.types[0].type.name
          
          // Imprime el nombre del Pokémon en la consola.
          console.log(this.pokeInformation);

          this.actualizarTipoEnFirebase(this.type)
        }),
        (error => {
          // Captura cualquier error que pueda ocurrir durante la suscripción y lo imprime en la consola.
          console.error(error);
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  actualizarTipoEnFirebase(nuevoTipo: string) {
    this.db.collection('pokemons').doc('type').update({ tipos: nuevoTipo })
      .then(() => console.log('Tipo actualizado en Firebase'))
      .catch(error => console.error('Error al actualizar tipo en Firebase', error));
  }

}
