import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  tasks$: Observable<Task[]>;
  private searchTerms = new Subject<string>();
  constructor(private taskservice: TaskService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {

    this.tasks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.taskservice.searchTasks(term)),
    );


  }


}
