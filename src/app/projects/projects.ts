import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService, Project } from './projects.service';
import { HackathonsService, Hackathon } from '../hackathons/hackathons.service';
import { UsersService, User } from '../users/users.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent {
  projects: Project[] = [];
  hackathons: Hackathon[] = [];
  users: User[] = [];
  error = '';
  newProject: Project = { name: '', description: '', hackathon_id: 0, created_by: '' };
  loading = false;
  selectedProject: Project | undefined;

  constructor(
    private projectsService: ProjectsService,
    private hackathonsService: HackathonsService,
    private usersService: UsersService
  ) {
    this.loadProjects();
    this.loadHackathons();
    this.loadUsers();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: data => this.projects = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadHackathons(): void {
    this.hackathonsService.getHackathons().subscribe({
      next: data => this.hackathons = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: data => this.users = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  getHackathonName(hackathon_id: number): string {
    const hack = this.hackathons.find(h => h.id === hackathon_id);
    return hack ? hack.name : hackathon_id.toString();
  }

  getUserName(user_id: string): string {
    const user = this.users.find(u => u.id === user_id);
    return user ? user.name : user_id;
  }

  addProject(): void {
    if (!this.newProject.name || !this.newProject.hackathon_id || !this.newProject.created_by) return;
    this.loading = true;
    this.projectsService.addProject(this.newProject).subscribe({
      next: p => {
        this.projects.push(p);
        this.newProject = { name: '', description: '', hackathon_id: 0, created_by: '' };
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.loading = false;
      }
    });
  }
}
