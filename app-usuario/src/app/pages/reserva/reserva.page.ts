import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage {
  // Barberos de ejemplo
  barberos = [
   { nombre: 'Carlos' },
  { nombre: 'Luis' },
  { nombre: 'Dante' },
  { nombre: 'Pedro' }
  ];
servicioSeleccionado: string = '';

  barberoSeleccionado: any = null;
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';

  // Horarios de ejemplo
  horasDisponibles: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  constructor(private router: Router) {}

  seleccionarBarbero(barbero: any) {
    this.barberoSeleccionado = barbero;
  }

  confirmarReserva() {
    if (this.barberoSeleccionado && this.fechaSeleccionada && this.horaSeleccionada) {
      const resumen = `
✅ Reserva confirmada:
Barbero: ${this.barberoSeleccionado.nombre}
Fecha: ${this.fechaSeleccionada}
Hora: ${this.horaSeleccionada}`;

      alert(resumen);

      // Aquí puedes guardar en Firebase si quieres

      // Reiniciar
      this.barberoSeleccionado = null;
      this.fechaSeleccionada = '';
      this.horaSeleccionada = '';
    } else {
      alert('Por favor selecciona barbero, fecha y hora');
    }
  }
}
