import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMessagesWidgetComponent } from './recent-messages-widget.component';

describe('RecentMessagesWidgetComponent', () => {
  let component: RecentMessagesWidgetComponent;
  let fixture: ComponentFixture<RecentMessagesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentMessagesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentMessagesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
