import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Cancion {
  title: string;
  artist: string;
  year: number;
  genre: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  filtro: string = '';
  canciones$: Observable<Cancion[]> = new Observable<Cancion[]>();

  constructor(private httpClient: HttpClient) {}

  ionViewWillEnter() {
    this.loadCanciones();
  }

  loadCanciones() {
    this.canciones$ = this.httpClient.get<Cancion[]>('assets/canciones.json'); // Ruta local al archivo JSON
  }

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