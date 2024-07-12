import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtenteUpdate } from '../../dto/UtenteUpdate';
import { ProfiloService } from '../../services/profilo.service';
import { Utente } from '../../dto/Utente';
import { Corso } from '../../dto/Corso';
import { Ruolo } from '../../dto/Ruolo';
import { AuthService } from '../../services/auth.service';
import { UtenteLogin } from '../../dto/UtenteLogin';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from '../../validators/passwordValidator';
import { HashedPassword } from '../../dto/HashedPassword';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  updateUserForm: FormGroup;
  user: Utente = new Utente(0, "", "", "", "", new Array<Corso>(), new Array<Ruolo>());
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profiloService: ProfiloService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.updateUserForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      oldPassword: [''],
      newPassword: ['', passwordValidator()]
    });
  }

  ngOnInit(): void {
    this.profiloService.getProfilo(this.storageService.getProperty('user_email'))?.subscribe(user => {
      this.user = user;
      this.updateUserForm.patchValue({
        nome: user.nome,
        cognome: user.cognome,
      });
    });
  }

  onSubmit(): void {
    if (this.updateUserForm.valid) {
      if (this.updateUserForm.get('newPassword')!.value) {
        this.authService.verifyPassword(new UtenteLogin(this.user.email, this.updateUserForm.get('oldPassword')!.value)).subscribe(isVerified => {
          if (isVerified) {
            this.authService.hashPassword(this.updateUserForm.get('newPassword')!.value).subscribe((pass: HashedPassword) => {
              this.user.password = pass.value;
              this.updateUser();
            })
          } else {
            this.loginError = true;
          }
        });
      } else {
        this.updateUser();
      }
    }
  }

  private updateUser(): void {
    const updatedUser = new UtenteUpdate(
      this.updateUserForm.get('nome')!.value,
      this.updateUserForm.get('cognome')!.value,
      this.user.email, 
      this.user.password, 
      this.user.corsi, 
      this.user.ruoli 
    );

    this.profiloService.updateProfilo(updatedUser)?.subscribe(() => {
      this.router.navigate(["/profilo"]);
    });
  }
}
