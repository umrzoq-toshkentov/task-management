import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { uniqueId } from 'lodash';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasksList = this.getAllTasks();
    if (status) {
      tasksList = tasksList.filter((task) => task.status === status);
    }

    if (search) {
      tasksList = tasksList.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        } else return false;
      });
    }

    return tasksList;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uniqueId(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const foundTask = this.getTaskById(id);
    foundTask.status = status;
    return foundTask;
  }
}
