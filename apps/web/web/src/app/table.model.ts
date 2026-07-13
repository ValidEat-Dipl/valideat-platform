import { Status } from './status.model';

export interface TableRow {
  [key: string]: string | number | boolean | Date | Status | null;
}

export interface TableHeader {
  key: string;
  label: string;
}

export interface TableData {
  headers: TableHeader[];
  rows: TableRow[];
}
