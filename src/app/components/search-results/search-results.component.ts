import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() results;
  @Input() loading;
  @Output() select: EventEmitter<any> = new EventEmitter();
  recipeResults = [];
  caloriesPerServing;

  constructor(
  ) {}

  ngOnInit() {}

  selectRecipe(uri) {
    this.select.emit(uri);
  }

  ngOnChanges() {
    this.recipeResults = this.results;
  }

}
