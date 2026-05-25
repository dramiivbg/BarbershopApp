import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonSpinner } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
import { MessageService } from 'src/app/shared/services/message/message-service';
import { Login } from 'src/app/shared/models/login';
import { TypeMessage } from 'src/app/shared/enums/type-message';
import { StorageService } from 'src/app/shared/services/storage/storageService';
import { APP_CONSTANTS } from 'src/app/core/constants/app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonInput, IonSpinner]
})
export class LoginPage implements OnInit {

 private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  public isSubmitting = signal(false);
  private messageService = inject(MessageService);
  private storageService = inject(StorageService);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit() {
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Datos de login:', { email, password });
      this.isSubmitting.set(true);
      const login: Login = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }
      try {
        const response = await firstValueFrom(this.authService.Login(login));
        if (!response.isCorrect) throw new Error(response.message);

        await this.storageService.set(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN, response.result.token);

        this.router.navigate(['private'], {replaceUrl: true});
      } catch (error:any) {
        this.messageService.message(TypeMessage.Error, error.message);
      }finally{
        this.isSubmitting.set(false);
      }
      // Aquí conectarías con tu backend en .NET
      // this.router.navigate(['/home']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
