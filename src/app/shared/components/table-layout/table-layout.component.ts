import { Component, Input, OnInit } from "@angular/core";
import { TableColumn } from "../../models/table-column.model";

@Component({
  selector: "app-table-layout",
  templateUrl: "./table-layout.component.html",
  styleUrls: ["./table-layout.component.scss"],
})
export class TableLayoutComponent {
  @Input() tableData: any;
  @Input() cols: TableColumn[] | undefined;
  @Input() showProfileLink: boolean = true;
  @Input() scrollable: boolean = false;
  @Input() scrollHeight: string = "none";

  // Fraug Flags
  flagSelected: string = "../../../../assets/images/fraud-detection/flag-selected.svg";
  flagUnselected: string = "../../../../assets/images/fraud-detection/flag-unselected.svg";

  getSeverity(status: string) {
    switch (status) {
      case "low":
        return "primary";
      case "medium":
        return "warning";
      case "high":
        return "danger";
      default:
        return "primary";
    }
  }
  
  // Fraud detection's Claim Status cell style.
  approvedStatusCellStyle: string = 'approved-status';
  pendingStatusCellStyle: string = 'pending-status'; 
  deniedStatusCellStyle: string = 'denied-status';
}
