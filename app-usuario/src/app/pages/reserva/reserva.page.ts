import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage {
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
  horasDisponibles: string[] = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  constructor(private router: Router, private reservaService: ReservaService) {}

  seleccionarBarbero(barbero: any) {
    this.barberoSeleccionado = barbero;
  }

  confirmarReserva() {
    if (this.barberoSeleccionado && this.fechaSeleccionada && this.horaSeleccionada) {
      const reserva = {
        barbero: this.barberoSeleccionado.nombre,
        fecha: this.fechaSeleccionada,
        hora: this.horaSeleccionada,
        timestamp: new Date()
      };

      this.reservaService.agregarReserva(reserva).then(() => {
        alert(`✅ Reserva confirmada:\nBarbero: ${reserva.barbero}\nFecha: ${reserva.fecha}\nHora: ${reserva.hora}`);
        // Reiniciar
        this.barberoSeleccionado = null;
        this.fechaSeleccionada = '';
        this.horaSeleccionada = '';
      }).catch((err) => {
        console.error('Error al guardar reserva', err);
        alert('❌ Error al guardar la reserva');
      });

    } else {
      alert('Por favor selecciona barbero, fecha y hora');
    }
  }
}