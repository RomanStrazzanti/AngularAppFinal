import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HackathonsService, Hackathon } from './hackathons.service';

@Component({
  selector: 'app-hackathons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hackathons.html',
  styleUrls: ['./hackathons.css'],
})
export class HackathonsComponent {
  hackathons: Hackathon[] = [];
  error = '';
  newHackathon: Hackathon = { name: '', description: '', start_date: '', end_date: '' };
  loading = false;

  constructor(private hackathonsService: HackathonsService) {
    this.loadHackathons();
  }

  loadHackathons(): void {
    this.hackathonsService.getHackathons().subscribe({
      next: data => this.hackathons = data,
      error: err => this.error = err.error?.message || err.message
    });
  }

  addHackathon(): void {
    if (!this.newHackathon.name || !this.newHackathon.start_date || !this.newHackathon.end_date) return;
    this.loading = true;
    this.hackathonsService.addHackathon(this.newHackathon).subscribe({
      next: h => {
        this.hackathons.push(h);
        this.newHackathon = { name: '', description: '', start_date: '', end_date: '' };
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.loading = false;
      }
    });
  }
}
