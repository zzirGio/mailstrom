import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePanelComponent } from './template-panel.component';

describe('TemplatePanelComponent', () => {
  let component: TemplatePanelComponent;
  let fixture: ComponentFixture<TemplatePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
