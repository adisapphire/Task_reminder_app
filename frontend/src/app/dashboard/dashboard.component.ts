import { Component, OnInit } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material';
import { TaskService } from '../task.service';
import { Task } from '../models/task';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  animal: string;
  name: string;
  tasks: Task[];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  getTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.getTasks();
  }

}
