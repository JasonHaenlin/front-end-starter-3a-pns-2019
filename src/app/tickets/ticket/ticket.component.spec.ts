import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketComponent } from './ticket.component';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    const dateToday: Date = new Date();
    component.ticket = {
      title: 'test title',
      description: 'test description',
      date: dateToday,
      // student: 1
    };
    fixture.detectChanges();
  });

  it('should be display correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('test title');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
