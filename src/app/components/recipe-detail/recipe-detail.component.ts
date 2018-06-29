import { Component, OnInit, Input, } from '@angular/core';
// import { selectedRecipe } from '../../reducers/recipes.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe;

  constructor() { }

  ngOnInit() {
  }

}
