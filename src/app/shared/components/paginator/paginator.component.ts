import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { PaginatorState } from "primeng/paginator";
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
})
export class PaginatorComponent implements OnChanges {
  @Input() totalRecords!: number;
  @Input() rowsPerPage!: number;

  @Output() onPageChangeEvent = new EventEmitter<PaginatorState>();
  @Output() onRowsChangeEvent = new EventEmitter<number>();
  // currentPage: number = 1;
  selectedValue: any = { name: "10", value: 10 };
  options = [
    { name: "5", value: 5 },
    { name: "10", value: 10 },
    { name: "20", value: 20 },
    { name: "30", value: 30 },
  ];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["rowsPerPage"]?.currentValue != null) {
      this.selectedValue = { name: changes["rowsPerPage"].currentValue.toString(), value: changes["rowsPerPage"].currentValue };;
    }
  }

  onPageChange(event: PaginatorState) {
    this.onPageChangeEvent.emit(event);
  }

  onRowsChange(event: any) {
    //send updated rowsPerPage to all listeners.    
    this.onRowsChangeEvent.emit(event.value.value);
  }
}
