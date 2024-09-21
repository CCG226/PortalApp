import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private subject = new Subject<any>();
  sendRegisterEvent() {
    this.subject.next(undefined);
  }
  recieveRegisterEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
