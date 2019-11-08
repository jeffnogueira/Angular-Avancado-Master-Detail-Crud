import { Component, OnInit } from '@angular/core';

import { Entry } from "../shared/entry.model"
import { EntryService } from "../shared/entry.service"

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = []

  constructor(private categoryService: EntryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Erro ao carregar a lista')
    )
  }

  deleteEntry(category){
    const mustDelete = confirm('Deseja realmente excluir este item?')

    if(mustDelete){
      this.categoryService.delete(category.id).subscribe(
        () => this.entries = this.entries.filter(element => element != category),
        () => alert('Erro ao tentar excluir')
      )
    }
  }

}
