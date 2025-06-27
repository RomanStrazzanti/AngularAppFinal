import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students';
import { HackathonsComponent } from './hackathons/hackathons';
import { ProjectsComponent } from './projects/projects';
import { TeamsComponent } from './teams/teams';
import { ScoresComponent } from './scores/scores';
import { TeamMembersComponent } from './teams/team_members';

export const routes: Routes = [
  { path: '', redirectTo: 'hackathons', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'hackathons', component: HackathonsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'team-members', component: TeamMembersComponent }
];
