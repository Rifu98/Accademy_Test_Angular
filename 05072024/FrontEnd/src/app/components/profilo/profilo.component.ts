import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Utente } from '../../dto/Utente';
import { ProfiloService } from '../../services/profilo.service';
import { Ruolo } from '../../dto/Ruolo';
import { Corso } from '../../dto/Corso';
import { CorsiService } from '../../services/corsi.service';
import { Router } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { UtenteUpdate } from '../../dto/UtenteUpdate';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgFor, NgClass,
    RouterLink
  ],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent implements OnInit {

  constructor(private profiloService: ProfiloService, private corsiService: CorsiService, private router: Router) { }

  utente: Utente = new Utente(0, "", "", "", "", new Array<Corso>(), new Array<Ruolo>());
  allCorsi: Corso[] = [];
  corsiDisponibili: Corso[] = [];
  groupedCourses: Corso[][] = [];
  itemForGroup = 3;

  ngOnInit(): void {
    this.profiloService.getProfilo(localStorage['user_email']).subscribe((res: Utente) => {
      this.utente = res;
      this.corsiService.getCorsi().subscribe((res: Corso[]) => {
        this.allCorsi = res;
        const idsLista2 = new Set(this.utente.corsi.map((corso: Corso) => corso.id));
        this.corsiDisponibili = this.allCorsi.filter((corso: Corso) => !idsLista2.has(corso.id));
        for (let i = 0; i < this.corsiDisponibili.length; i += this.itemForGroup) {
          this.groupedCourses.push(this.corsiDisponibili.slice(i, i + 3));
        }
      })
    })
  }
  subscribe(id: number) {
    let updateCorsi = this.utente.corsi;
    this.corsiService.getCorso(id).subscribe((res: Corso) => {
      updateCorsi.push(res)

      const utenteUpdate = new UtenteUpdate(
        this.utente.nome,
        this.utente.cognome,
        this.utente.email,
        this.utente.password,
        updateCorsi,
        this.utente.ruoli
      );
      this.profiloService.updateProfilo(utenteUpdate).subscribe((res) => {
        window.location.reload();
      })
    })
  }

  unsubscribe(id: number) {
    let updateCorsi = this.utente.corsi;
    updateCorsi = this.utente.corsi.filter(corso => corso.id !== id)
    const utenteUpdate = new UtenteUpdate(
      this.utente.nome,
      this.utente.cognome,
      this.utente.email,
      this.utente.password,
      updateCorsi,
      this.utente.ruoli
    );
    this.profiloService.updateProfilo(utenteUpdate).subscribe((res) => {
      window.location.reload();
    })
  }
  logout() {
    localStorage.removeItem('user_email');
    localStorage.removeItem('access_token');
    this.router.navigate(["/"]);
  }
}
