import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  time: number;
  private startTime: number;
  constructor() { }
  start() {
    this.startTime = Date.now();
  }
  end() {
    this.time = Date.now() - this.startTime;
  }
}
