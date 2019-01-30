import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipsComponent } from './add-tips.component';

describe('AddTipsComponent', () => {
  let component: AddTipsComponent;
  let fixture: ComponentFixture<AddTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
