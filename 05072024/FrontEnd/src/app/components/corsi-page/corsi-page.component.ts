import { Component } from '@angular/core';
import { CorsiService } from '../../services/corsi.service';
import { Categoria } from '../../dto/Categoria';
import { CategorieService } from '../../services/categorie.service';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Corso } from '../../dto/Corso';



@Component({
  selector: 'app-corsi-page',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './corsi-page.component.html',
  styleUrl: './corsi-page.component.css'
})
export class CorsiPageComponent {

  constructor(private corsiService: CorsiService, private categorieService: CategorieService) { }

  courses: Corso[] = [];
  filteredCorsi: Corso[] = [];
  searchText: string = '';
  selectedCategory: string = 'All';
  selectedDuration: string = 'All';
  categories: Categoria[] = [];
  

  filterCourses() {
    this.filteredCorsi = this.courses.filter(corso => {
      return (
        (this.searchText === '' || corso.nomeCorso.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (this.selectedCategory === 'All' || corso.categoria.nomeCategoria === this.selectedCategory) &&
        (this.selectedDuration === 'All' || corso.durata <= parseInt(this.selectedDuration))
      );
    });
  }

  onSearchTextChange() {
    this.filterCourses();
  }

  onCategoryChange() {
    this.filterCourses();
  }

  onDurationChange() {
    this.filterCourses();
  }

  ngOnInit(): void {
    this.categorieService.getCategorie().subscribe((categorie: Categoria[]) => {
      this.categories = categorie;
    })
    this.corsiService.getCorsi().subscribe((corsi: Corso[]) => {
      this.courses = corsi;
      this.filteredCorsi = corsi;
    })
  }
}
