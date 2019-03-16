import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../../models/Ticket';
import { API_URL, handleError, HTTP_OPTIONS } from '../httpHelper';

const url = API_URL + 'tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
    this.loadTickets();
  }
  private ticketList: Ticket[] = [];

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject(this.ticketList);

  archiveTicket(archivedticket: Ticket): void {
    const studentId = [];
    archivedticket.student.forEach(s => studentId.push(s.id));
    const ticket = Object.assign({}, archivedticket, { 'studentId': studentId });
    delete ticket.student;
    const ticketUrl = `${url}/${ticket.id}`;
    this.http.put<Ticket>(ticketUrl, ticket, HTTP_OPTIONS)
      .pipe(catchError(handleError('archiveTicket')))
      .subscribe(t => {
        const newTicket: Ticket = t;
        this.ticketList[this.ticketList.indexOf(archivedticket)].archived = newTicket.archived;
      });
  }

  deleteTicket(ticket: Ticket): void {
    const ticketUrl = `${url}/${ticket.id}`;
    this.http.delete<Ticket>(ticketUrl, HTTP_OPTIONS)
      .pipe(catchError(handleError('deleteTicket')))
      .subscribe(_ => this.ticketList.splice(this.ticketList.indexOf(ticket), 1));
  }


  addTicket(ticket: Ticket): void {
    this.http.post<Ticket>(url, ticket)
      .pipe(catchError(handleError<Ticket>('archiveTicket')))
      .subscribe(t => {
        if (t !== undefined) {
          this.ticketList.push(t);
          this.updateObs();
        }
      }, err => console.log('Error retrieving new Ticket'));

  }

  private updateObs(): void {
    this.tickets$.next(this.ticketList);
  }

  loadTickets(): void {
    this.http.get<Ticket[]>(url, HTTP_OPTIONS).subscribe(t => {
      this.ticketList = t;
      this.tickets$.next(t);
    });
  }
}
