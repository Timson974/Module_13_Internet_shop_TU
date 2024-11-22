import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isShowedSource = new BehaviorSubject<boolean>(false);
  isShowed$ = this.isShowedSource.asObservable().pipe(
    switchMap(show => show ? of(show) : of(show).pipe(delay(500)))  // Задержка 500 мс перед скрытием лоадера
  );

  show() {
    this.isShowedSource.next(true);
  }

  hide() {
    this.isShowedSource.next(false);
  }
}

