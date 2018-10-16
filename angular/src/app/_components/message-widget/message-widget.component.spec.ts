import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWidgetComponent } from './message-widget.component';

describe('MessageWidgetComponent', () => {
  let component: MessageWidgetComponent;
  let fixture: ComponentFixture<MessageWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
