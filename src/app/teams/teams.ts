import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamsService, Team } from './teams.service';
import { ProjectsService, Project } from '../projects/projects.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teams.html',
  styleUrls: ['./teams.css'],
})
export class TeamsComponent {
  teams: Team[] = [];
  error = '';
  newTeam: Team = { name: '', project_id: 0 };
  loading = false;
  projects: Project[] = [];

  constructor(private teamsService: TeamsService, private projectsService: ProjectsService) {
    this.loadTeams();
    this.loadProjects();
  }

  loadTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: data => this.teams = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (data: Project[]) => this.projects = data,
      error: (err: any) => this.error = err.error?.message || err.message
    });
  }

  addTeam(): void {
    if (!this.newTeam.name || !this.newTeam.project_id) return;
    this.loading = true;
    this.teamsService.addTeam(this.newTeam).subscribe({
      next: t => {
        this.teams.push(t);
        this.newTeam = { name: '', project_id: 0 };
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.loading = false;
      }
    });
  }

  getProjectName(project_id: number): string {
    const project = this.projects.find(p => p.id === project_id);
    return project ? project.name : project_id.toString();
  }
}
