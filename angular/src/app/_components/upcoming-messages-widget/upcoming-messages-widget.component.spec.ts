import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMessagesWidgetComponent } from './upcoming-messages-widget.component';

describe('UpcomingMessagesWidgetComponent', () => {
  let component: UpcomingMessagesWidgetComponent;
  let fixture: ComponentFixture<UpcomingMessagesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingMessagesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingMessagesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
