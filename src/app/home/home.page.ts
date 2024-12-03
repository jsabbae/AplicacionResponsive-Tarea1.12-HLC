import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Cancion {
  title: string;
  artist: string;
  year: number;
  genre: string;
  image: string;  // Asegúrate de que esta propiedad esté en tu JSON
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  filtro: string = '';  // Filtro para buscar canciones por título
  canciones$: Observable<Cancion[]> = new Observable<Cancion[]>();  // Observable para las canciones

  constructor(private dataService: DataService) {}

  // Llamada cuando la vista va a entrar
  ionViewWillEnter() {
    this.loadCanciones();
  }

  // Método para cargar las canciones del servicio
  loadCanciones() {
    this.canciones$ = this.dataService.getCanciones();
  }

  // Método para aplicar el filtro
  applyFilter() {
    if (this.filtro.trim()) {
      this.canciones$ = this.canciones$.pipe(
        map((canciones: Cancion[]) =>
          canciones.filter(cancion =>
            cancion.title.toLowerCase().includes(this.filtro.toLowerCase())
          )
        )
      );
    } else {
      this.loadCanciones();
    }
  }
}