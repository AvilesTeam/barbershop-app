import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/service/reserva.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss']
})
export class ReportePage implements OnInit {
  reservas: any[] = [];

  constructor(
    private reservaService: ReservaService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.reservaService.obtenerReservas().subscribe(data => {
      this.reservas = data;
    });
  }

  async eliminarReserva(id: string) {
    const alerta = await this.alertCtrl.create({
      header: '¿Eliminar reserva?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.reservaService.eliminarReserva(id);
          }
        }
      ]
    });

    await alerta.present();
  }

  async editarReserva(reserva: any) {
    const alerta = await this.alertCtrl.create({
      header: 'Editar Reserva',
      inputs: [
        {
          name: 'barbero',
          type: 'text',
          placeholder: 'Barbero',
          value: reserva.barbero
        },
        {
          name: 'fecha',
          type: 'date',
          value: reserva.fecha
        },
        {
          name: 'hora',
          type: 'text',
          placeholder: 'Hora',
          value: reserva.hora
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const nuevaData = {
              barbero: data.barbero,
              fecha: data.fecha,
              hora: data.hora
            };
            this.reservaService.editarReserva(reserva.id, nuevaData);
          }
        }
      ]
    });

    await alerta.present();
  }
}