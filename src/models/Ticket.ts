import { Student } from './Student';
export interface Ticket {
  id?: number;
  title?: string;
  description?: string;
  date?: Date;
  student?: Student[];
  major?: Major;
  archived?: boolean;
}

export enum Major {
  ANY = 'ALL',
  SI = 'SI',
  GB = 'GB',
  GE = 'GE',
}
