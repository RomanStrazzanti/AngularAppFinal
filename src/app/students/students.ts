import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentsService, Student } from './students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  error = '';
  search = '';
  loading = false;

  studentsService = inject(StudentsService);

  constructor() {
    this.loadStudents();
  }

  loadStudents(search: string = ''): void {
    this.studentsService.getStudents(search).subscribe({
      next: (data: Student[]) => this.students = data,
      error: (err: any) => this.error = err.error?.message || err.message
    });
  }

  onSearch(): void {
    this.loadStudents(this.search);
  }
}
