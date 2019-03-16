import { Ticket } from '../models/Ticket';
import { Major } from './../models/Ticket';
import { STUDENTS_MOCKED } from './Student.mock';

const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    title: 'Stay in Tokyo',
    description: '',
    date: dateToday,
    student: [],
    major: Major.SI,
    archived: false,
  },
  {
    title: 'SI5 in Paris',
    description: 'Description du voyage',
    date: dateToday,
    student: [],
    major: Major.GE,
    archived: false,
  },
  {
    title: 'SI5 in Pekin',
    date: dateToday,
    student: [],
    major: Major.SI,
    archived: false,
  },
  {
    title: 'SI5 in Shanghai',
    date: dateToday,
    student: [],
    major: Major.GE,
    archived: true,
  },
];
