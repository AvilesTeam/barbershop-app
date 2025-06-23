import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth'; // por si luego usas el uid del cliente

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private firestore: AngularFirestore) {}

  agregarReserva(reserva: any) {
    return this.firestore.collection('reservas').add(reserva);
  }

  obtenerReservas() {
    return this.firestore.collection('reservas').valueChanges({ idField: 'id' });
  }
}