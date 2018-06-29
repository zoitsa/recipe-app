import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() results;
  @Input() loading;
  @Input() recipe;
  @Output() select: EventEmitter<any> = new EventEmitter();
  recipeResults = [];
  caloriesPerServing;

  constructor(
  ) {}

  ngOnInit() {
    console.log(this.recipe);
  }

  selectRecipe(uri) {
    this.select.emit(uri);
  }

  ngOnChanges() {
    this.recipeResults = this.results;
  }

}
