import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditComponent } from '@app/views/template-edit/template-edit.component';;

describe('TemplateEditComponent', () => {
  let component: TemplateEditComponent;
  let fixture: ComponentFixture<TemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
