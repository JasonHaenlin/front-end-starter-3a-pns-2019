import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from '../../../models/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  /**
   * Inputs & Output allow communication between parent & child components.
   * More information: https://angular.io/guide/component-interaction
   */
  @Input()
  ticket: Ticket;

  @Output() ticketHasBeenSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ticketHasBeenDeleted: EventEmitter<Ticket> = new EventEmitter<Ticket>();
  @Output() ticketHasBeenArchived: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  constructor() {
  }

  ngOnInit() {
  }

  selectTicket() {
    this.ticketHasBeenSelected.emit(true);
  }

  deleteTicket() {
    this.ticketHasBeenDeleted.emit(this.ticket);
  }

  archiveTicket() {
    this.ticketHasBeenArchived.emit(this.ticket);
  }
}
