import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Score {
  id?: number;
  project_id: number;
  jury_id: number;
  note: number;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class ScoresService {
  private url = 'http://localhost:5000/api/scores';

  constructor(private http: HttpClient) {}

  getScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.url);
  }

  addScore(score: Score): Observable<Score> {
    return this.http.post<Score>(this.url, score);
  }
}
