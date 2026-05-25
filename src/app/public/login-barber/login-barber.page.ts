import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonInput, 
  IonIcon, 
  IonButton,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  storefrontOutline, 
  businessOutline, 
  mailOutline, 
  lockClosedOutline, 
  textOutline, 
  callOutline, 
  eyeOutline, 
  eyeOffOutline, 
  arrowBackOutline 
} from 'ionicons/icons';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
import { User } from 'src/app/shared/models/user';
import { firstValueFrom } from 'rxjs';
import { TypeMessage } from 'src/app/shared/enums/type-message';
import { MessageService } from 'src/app/shared/services/message/message-service';
import { APP_CONSTANTS } from 'src/app/core/constants/app.constants';
import { Login } from 'src/app/shared/models/login';
import { StorageService } from 'src/app/shared/services/storage/storageService';
import { BarbershopService } from 'src/app/shared/services/barbershop/barbershop-service';

@Component({
  selector: 'app-login-barber',
  templateUrl: './login-barber.page.html',
  styleUrls: ['./login-barber.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonItem, 
    IonInput, 
    IonIcon, 
    IonButton,
    IonSpinner
  ]
})
export class LoginBarberPage implements OnInit {
// Inyecciones modernas
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private AuthService = inject(AuthService); // Asegúrate de tener un servicio de autenticación para manejar login/registro
  private messageService = inject(MessageService);
  private storageService = inject(StorageService);
  private barbershopService = inject(BarbershopService);
    public isSubmitting = signal(false);
  // Estados del formulario
  barberiaForm!: FormGroup;
  esModoLogin: boolean = true; // Controla si se muestra Login o Registro
  mostrarPassword: boolean = false;

  constructor() {
    // Registro de íconos requeridos para Ionic Standalone
    addIcons({ 
      storefrontOutline, businessOutline, mailOutline, 
      lockClosedOutline, textOutline, callOutline, 
      eyeOutline, eyeOffOutline, arrowBackOutline 
    });
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.barberiaForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Campos opcionales iniciales (se validarán dinámicamente en modo registro)
      nombreBarberia: [''],
      telefono: ['']
    });
  }

  /**
   * Cambia dinámicamente entre la vista de Login y la de Crear Cuenta
   */
  cambiarModo() {
    this.barberiaForm.patchValue({
      correo: '',
      password: '',
      nombreBarberia: '',
      telefono: ''
    });

    this.esModoLogin = !this.esModoLogin;
    
    const nombreCtrl = this.barberiaForm.get('nombreBarberia');
    const telefonoCtrl = this.barberiaForm.get('telefono');

    if (!this.esModoLogin) {
      // Si pasa a registro, los campos adicionales se vuelven obligatorios
      nombreCtrl?.setValidators([Validators.required, Validators.minLength(3)]);
      telefonoCtrl?.setValidators([Validators.required, Validators.pattern('^[0-9+ ]*$')]);
    } else {
      // Si vuelve a login, se limpian las reglas de validación de esos campos
      nombreCtrl?.clearValidators();
      telefonoCtrl?.clearValidators();
    }
    
    // Actualizar el estado de validación del formulario
    nombreCtrl?.updateValueAndValidity();
    telefonoCtrl?.updateValueAndValidity();
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  enviarFormulario() {
    if (this.barberiaForm.invalid) return;

    const datos = this.barberiaForm.value;

    if (this.esModoLogin) {
      this.onLogin();
      console.log('Iniciando sesión de barbería con:', datos.correo, datos.password);
      // Aquí conectas con tu servicio de Autenticación de Firebase / Backend API
      // this.router.navigate(['/dashboard-barberia']);
    } else {
      this.registerBarber();
      console.log('Creando nueva cuenta de barbería:', datos);
      // Aquí conectas con tu servicio para registrar la Barbería en tu Base de Datos
    }
  }


  async onLogin() {
    if (this.barberiaForm.valid) {
      const { email, password } = this.barberiaForm.value;
      console.log('Datos de login:', { email, password });
      this.isSubmitting.set(true);
      const login: Login = {
        email: this.barberiaForm.controls['correo'].value,
        password: this.barberiaForm.controls['password'].value
      }
      try {
        const response = await firstValueFrom(this.AuthService.Login(login));
        if (!response.isCorrect) throw new Error(response.message);

        if(response.result.role !== 'administrator') throw new Error('Acceso denegado: No es una cuenta de barbería');

        await this.storageService.set(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN, response.result.token);

        this.router.navigate(['private/admin'], { replaceUrl: true });
      } catch (error: any) {
        this.messageService.message(TypeMessage.Error, error.message);
      } finally {
        this.isSubmitting.set(false);
      }
      // Aquí conectarías con tu backend en .NET
      // this.router.navigate(['/home']);
    }
  }


  async registerBarber() {
    const newUser: User = {
      name: this.barberiaForm.value.nombreBarberia,
      email: this.barberiaForm.value.correo,
      password: this.barberiaForm.value.password,
      role: 'administrator',
      isActive: true
    };

    this.isSubmitting.set(true);

    console.log('Enviando registro:', newUser);

    try {
      const response = await firstValueFrom(this.AuthService.register(newUser));
      if (!response.isCorrect) throw new Error(response.message);

      const login: Login = {
        email: this.barberiaForm.controls['correo'].value,
        password: this.barberiaForm.controls['password'].value
      }

      const response2 = await firstValueFrom(this.AuthService.Login(login));
      if (!response2.isCorrect) throw new Error(response2.message);

      const response3 = await firstValueFrom(this.barbershopService.create({
        name: this.barberiaForm.value.nombreBarberia,
        isActive: true,
        subscriptionEndDate: new Date(new Date().setFullYear(new Date().getFullYear())) // Ejemplo: suscripción de 1 año
      }, response2.result.token));

    if (!response3.isCorrect) throw new Error(response3.message);
    
      this.messageService.message(TypeMessage.Success, `Barbería registrada correctamente`, () => {
        this.cambiarModo(); // Volver a la vista de login después de registrar exitosamente
        this.storageService.remove(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN); // Limpiar token después de registro
      });

    } catch (error: any) {
      this.messageService.message(TypeMessage.Error, error.message);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  recuperarPassword() {
    console.log('Redirigiendo a recuperación de contraseña...');
  }

  regresar() {
    this.router.navigate(['/type-user']); // Te regresa a la pantalla de las 2 cards anteriores
  }
}
