import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";

@Injectable({
  providedIn: "root",
})
export class ExportExcelService {
  constructor() {}

  exportToExcel(data: any[], fileName: string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    const url: string = URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = fileName + '.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
