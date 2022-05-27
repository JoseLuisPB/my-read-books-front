import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({providedIn: 'root'})
export class MessageService {

  @Output() columnSorted = new EventEmitter<string>();
  @Output() updateTotalPages = new EventEmitter<number>();

  emitColumnSorted(columnSorted: string) {
    this.columnSorted.emit(columnSorted);
  }

  emitUpdateTotalPages(take: number) {
    this.updateTotalPages.emit(take);
  }
}
