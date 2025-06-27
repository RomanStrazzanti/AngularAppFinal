import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TeamMember {
  user_id: number;
  team_id: number;
}

@Injectable({ providedIn: 'root' })
export class TeamMembersService {
  private url = 'http://localhost:5000/api/team-members';

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.url);
  }

  addTeamMember(member: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.url, member);
  }
}
