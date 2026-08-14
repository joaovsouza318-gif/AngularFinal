import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridasComponent } from './corridas-component';

describe('CorridasComponent', () => {
  let component: CorridasComponent;
  let fixture: ComponentFixture<CorridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorridasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorridasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
