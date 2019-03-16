import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/Ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[] = [];
  public showArchived = true;
  public showStatus = 'Hide';

  constructor(public ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketService.tickets$.subscribe((tickets) => {
      this.ticketList = tickets;
      console.log('ticket-list');
    });
  }

  ticketHasBeenSelected(hasBeenSelected: boolean) {
    console.log('event received from child:', hasBeenSelected);
  }

  ticketHasBeenDeleted(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket);
  }

  ticketHasBeenArchived(ticket: Ticket) {
    ticket.archived = !ticket.archived;
    this.ticketService.archiveTicket(ticket);
  }

  archiveStatus() {
    if (this.showArchived) {
      this.showStatus = 'Show';
    } else {
      this.showStatus = 'Hide';
    }
    this.showArchived = !this.showArchived;
  }

}
