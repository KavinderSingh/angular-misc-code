export class TableColumn {
    field!: string;
    header!: string;
    type: string = 'text';
    options?: any;
    selected: boolean = true;
    width?:number;
    styles?:string;
}