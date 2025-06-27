import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hackathon {
  id?: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

@Injectable({ providedIn: 'root' })
export class HackathonsService {
  private url = 'http://localhost:5000/api/hackathons';

  constructor(private http: HttpClient) {}

  getHackathons(): Observable<Hackathon[]> {
    return this.http.get<Hackathon[]>(this.url);
  }

  addHackathon(hackathon: Hackathon): Observable<Hackathon> {
    return this.http.post<Hackathon>(this.url, hackathon);
  }
}
