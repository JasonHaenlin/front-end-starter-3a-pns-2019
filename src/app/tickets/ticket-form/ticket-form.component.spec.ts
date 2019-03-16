import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFormComponent } from './ticket-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TicketFormComponent', () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
