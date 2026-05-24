import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonSpinner, IonCheckbox } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
import { User } from 'src/app/shared/models/user';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message/message-service';
import { TypeMessage } from 'src/app/shared/enums/type-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonItem, IonInput, IonSpinner, IonCheckbox]
})
export class RegisterPage{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  public isSubmitting = signal(false);
  private messageService = inject(MessageService);

  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    Role: ['client'],
    password: ['', [Validators.required, Validators.minLength(6)]],
    isActive: [true, [Validators.requiredTrue]] // Requerido para avanzar
  });

  async onRegister() {
    if (this.registerForm.valid) {
      // Estructura lista para enviar a tu API en .NET
      const newUser: User = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: this.registerForm.value.Role,
        isActive: this.registerForm.value.isActive
      };

      this.isSubmitting.set(true);
      
      console.log('Enviando registro:', newUser);

      try {
        const response = await firstValueFrom(this.authService.register(newUser));
        if(!response.isCorrect) throw new Error(response.message);
        this.messageService.message(TypeMessage.Success, `Usuario ${newUser.name} registrado correctamente`, () => {
          this.router.navigate(['/login']);
        });
        
      } catch (error:any) {
        this.messageService.message(TypeMessage.Error, error.message);
      }finally{
        this.isSubmitting.set(false);
      }
    }
  }

}
