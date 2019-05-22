import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;
  
  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location) { 
    }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    console.log("it is working");
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

}
