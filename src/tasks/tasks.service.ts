import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} Not found`);
    }

    return found;
  }

  // getTaskById(id: string): Task {
  //   const foundTask = this.tasks.find((item) => item.id === id);
  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with ID ${id} Not found`);
  //   } else {
  //     return foundTask;
  //   }
  // }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasksList = this.getAllTasks();
  //   if (status) {
  //     tasksList = tasksList.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasksList = tasksList.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search) ||
  //         task.description.toLowerCase().includes(search)
  //       ) {
  //         return true;
  //       } else return false;
  //     });
  //   }
  //   return tasksList;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uniqueId(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const foundTask = this.getTaskById(id);
  //   foundTask.status = status;
  //   return foundTask;
  // }
}
