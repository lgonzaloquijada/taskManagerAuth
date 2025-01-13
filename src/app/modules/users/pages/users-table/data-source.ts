import { DataSource } from '@angular/cdk/collections';
import { User } from '@models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceUser<T> extends DataSource<T> {
  data = new BehaviorSubject<T[]>([]);
  originalData: T[] = [];

  connect(): Observable<any[]> {
    return this.data;
  }

  init(data: T[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() {}
}
