import {Status} from './status.model';

export interface TableRow {
  [key: string]: string | number | boolean | Date | Status | null;
}

export interface TableData {
  headers: string[];
  rows: TableRow[];
}
