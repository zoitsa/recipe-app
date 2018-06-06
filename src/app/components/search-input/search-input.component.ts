import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @ViewChild('input') input: ElementRef; // To select input element
  @Output() search: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {
    Observable.fromEvent(this.input.nativeElement, 'keyup') // Create an observable from input keyup events
      .map((e: any) => e.target.value) // mapping the raw value to the actual user input
      .filter((text: string) => text.length > 1) // do nothing if user enters nothing
      .debounceTime(400) // only check the events every 400ms
      .do((query: string) => this.search.emit(query))// make a search with the query ))
      .switch() // if there is another user input, cancel previous stream
      .subscribe();
  }

}
