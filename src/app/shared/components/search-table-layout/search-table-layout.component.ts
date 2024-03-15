import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: "app-search-table-layout",
  templateUrl: "./search-table-layout.component.html",
  styleUrls: ["./search-table-layout.component.scss"],
})
export class SearchTableLayoutComponent {
  // Table Inputs
  @Input() tableHeader: TableColumn[] = [];
  @Input() tableRowData: any;

  // Pagination Inputs
  @Input() totalRecords: number = 0;
  @Output() pageChange: EventEmitter<PaginatorState> = new EventEmitter<PaginatorState>();
  @Output() rowsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchAction: EventEmitter<string> = new EventEmitter<string>();

  // Search icon
  searchIcon: string = "../../../../../assets/images/churn-risk/magnifying-glass.svg";
  searchText!: string;

  // Number of rows to display in page.
  pagelimit: number = 10;

  onSearchAction() {
    this.searchAction.emit(this.searchText);
  }
  
  onPageChange(event: PaginatorState) {
    this.pageChange.emit(event);
  }

  onRowsChange(event: any) {
    this.pagelimit = event;
    this.rowsChange.emit(event);
  }

}
