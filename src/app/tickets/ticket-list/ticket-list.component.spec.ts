import { TicketComponent } from './../ticket/ticket.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListComponent } from './ticket-list.component';
import { TicketService } from 'src/services/ticket/ticket.service';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketListComponent, TicketComponent],
      providers: [TicketService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
