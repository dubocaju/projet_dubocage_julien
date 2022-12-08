import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {
  searchField$!: Observable<any>;
  @ViewChild('input', { static: true }) input!: ElementRef;
  @ViewChild('select', { static: true }) select!: ElementRef;
  @Output() search = new EventEmitter<string>();
  @Output() category = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  constructor() { }

  ngAfterViewInit() {
    this.select.nativeElement.selectedIndex = -1;
    this.searchField$ = fromEvent(this.input.nativeElement, `keyup`);
    this.searchField$.pipe(
      map((event) => event.target.value),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(query => this.search.emit(query))
  }

  changeCategory(category: string) {
    this.category.emit(category);
  }

  clickReset() {
    this.input.nativeElement.value = '';
    this.select.nativeElement.selectedIndex = -1;
    this.reset.emit();
  }

}
