import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamMembersService, TeamMember } from './team_members.service';
import { UsersService, User } from '../users/users.service';
import { TeamsService, Team } from './teams.service';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team_members.html',
  styleUrls: ['./team_members.css'],
})
export class TeamMembersComponent {
  teamMembers: TeamMember[] = [];
  users: User[] = [];
  teams: Team[] = [];
  error = '';
  newMember: TeamMember = { user_id: 0, team_id: 0 };
  loading = false;

  constructor(
    private teamMembersService: TeamMembersService,
    private usersService: UsersService,
    private teamsService: TeamsService
  ) {
    this.loadTeamMembers();
    this.loadUsers();
    this.loadTeams();
  }

  loadTeamMembers(): void {
    this.teamMembersService.getTeamMembers().subscribe({
      next: data => this.teamMembers = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: data => this.users = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: data => this.teams = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  getUserName(user_id: number | string): string {
    const user = this.users.find(u => u.id == user_id);
    return user ? user.name : user_id.toString();
  }

  getTeamName(team_id: number | string): string {
    const team = this.teams.find(t => t.id == team_id);
    return team ? team.name : team_id.toString();
  }

  addTeamMember(): void {
    if (!this.newMember.user_id || !this.newMember.team_id) return;
    this.loading = true;
    this.teamMembersService.addTeamMember(this.newMember).subscribe({
      next: m => {
        this.teamMembers.push(m);
        this.newMember = { user_id: 0, team_id: 0 };
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.loading = false;
      }
    });
  }
}
