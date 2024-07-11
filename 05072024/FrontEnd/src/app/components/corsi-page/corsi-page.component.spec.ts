import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsiPageComponent } from './corsi-page.component';

describe('CorsiPageComponent', () => {
  let component: CorsiPageComponent;
  let fixture: ComponentFixture<CorsiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorsiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorsiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
