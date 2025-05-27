import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/service/firebase_Datos.service'; // Asegúrate que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup; 
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login exitoso', userCredential.user);
        this.errorMessage = '';

        // Redirigir según el usuario (admin o cliente)
        if (email === 'admin@barber.com') {
       console.log('Redirigiendo a reserva');
        this.router.navigate(['/reserva']);
      } else {
        console.log('Redirigiendo a reporte');
        this.router.navigate(['/reporte']);
      }
    })
    .catch((error) => {
      console.error('Error de login:', error.message);
      this.errorMessage = 'Correo o contraseña incorrectos';
    });
}
}