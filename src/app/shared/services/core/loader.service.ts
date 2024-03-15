import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  requestCount = 0;
  isLoading = new Subject<boolean>();

  show(): void {
    this.isLoading.next(true);
  }

  hide(): void {
    if (this.requestCount <= 0) {
      this.isLoading.next(false);
    } else {
      this.show();
    }
  }
}
