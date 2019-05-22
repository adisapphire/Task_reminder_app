import { Component, OnInit } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material';
import { TaskService } from '../task.service';
import { Task } from '../models/task';
import { UserService } from '../user.service';
import { Users } from '../models/users';

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  task: Task;
  tasks: Task[];
  users: Users[];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}
  
  getTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks =>this.tasks = tasks);
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      data : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.add(result);
      // this.getTasks();
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  add(task: Task): void {
    if (!task) { return; }
    this.taskService.addTask(task)
      .subscribe(task => {
        // this.tasks.push(task);
        this.getTasks();
      });
  }

}
