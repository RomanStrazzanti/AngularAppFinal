import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  student_id: string;
  name: string;
  gender: string;
  age: number;
  grade_level: number;
  math_score: number;
  reading_score: number;
  writing_score: number;
  attendance_rate: number;
  parent_education: string;
  study_hours: number;
  internet_access: string;
  lunch_type: string;
  extra_activities: string;
  final_result: string;
}

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private url = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(search: string = ''): Observable<Student[]> {
    const params = search ? { params: { search } } : {};
    return this.http.get<Student[]>(this.url, params);
  }
}
