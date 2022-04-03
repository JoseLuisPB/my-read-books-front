import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({providedIn: 'root'})
export class MessageService {

  @Output() columnSorted = new EventEmitter<string>();

  emitColumnSorted(columnSorted: string) {
    this.columnSorted.emit(columnSorted);
  }
}
