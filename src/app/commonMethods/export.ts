import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export class Export {
    private static fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    private static fileExtension = ".xlsx";

    public static JsonToExcel(data: any[], fileName: string, header: any[]): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, {
            cellDates: true,
            dateNF: 'dd"-"MM"-"yyyy'
        });
        XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A1' });
        const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array'
        });
        this.saveExcelFile(excelBuffer, fileName);
    }

    private static saveExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: this.fileType });
        FileSaver.saveAs(data, fileName + this.fileExtension);
    }

}