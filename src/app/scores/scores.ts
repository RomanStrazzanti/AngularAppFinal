import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScoresService, Score } from './scores.service';
import { ProjectsService, Project } from '../projects/projects.service';
import { UsersService, User } from '../users/users.service';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scores.html',
  styleUrls: ['./scores.css'],
})
export class ScoresComponent {
  scores: Score[] = [];
  projects: Project[] = [];
  users: User[] = [];
  error = '';
  newScore: Score = { project_id: 0, jury_id: 0, note: 0, comment: '' };
  loading = false;

  constructor(
    private scoresService: ScoresService,
    private projectsService: ProjectsService,
    private usersService: UsersService
  ) {
    this.loadScores();
    this.loadProjects();
    this.loadUsers();
  }

  loadScores(): void {
    this.scoresService.getScores().subscribe({
      next: data => this.scores = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: data => this.projects = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: data => this.users = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  getProjectName(project_id: number): string {
    const project = this.projects.find(p => p.id === project_id);
    return project ? project.name : project_id.toString();
  }

  getUserName(user_id: number | string): string {
    const user = this.users.find(u => u.id == user_id);
    return user ? user.name : user_id.toString();
  }

  addScore(): void {
    if (!this.newScore.project_id || !this.newScore.jury_id) return;
    this.loading = true;
    this.scoresService.addScore(this.newScore).subscribe({
      next: s => {
        this.scores.push(s);
        this.newScore = { project_id: 0, jury_id: 0, note: 0, comment: '' };
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.loading = false;
      }
    });
  }
}
