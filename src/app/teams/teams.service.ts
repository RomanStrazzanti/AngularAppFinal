import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  id?: number;
  name: string;
  project_id: number;
}

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private url = 'http://localhost:5000/api/teams';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url);
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.url, team);
  }
}
