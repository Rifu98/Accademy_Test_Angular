import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { CorsiService } from '../../services/corsi.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { Corso } from '../../dto/Corso';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    RouterLink,
    NgFor,
    NgClass
  ],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css'
})
export class CorsiComponent implements OnInit {

  constructor(private corsiService: CorsiService) { }

  courses: Corso[] = [];
  groupedCourses: Corso[][] = [];
 

  ngOnInit(): void {
    this.corsiService.getCorsi().subscribe((corsi: Corso[]) => {
      this.courses = corsi;
      for (let i = 0; i < this.courses.length; i += 3) {
        this.groupedCourses.push(this.courses.slice(i, i + 3));
      }
    })
  }

}
