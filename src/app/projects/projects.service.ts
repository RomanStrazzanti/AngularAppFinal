import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id?: number;
  name: string;
  description: string;
  hackathon_id: number;
  created_by: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private url = 'http://localhost:5000/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }
}
