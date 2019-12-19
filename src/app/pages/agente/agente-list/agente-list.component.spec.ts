import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenteListComponent } from './agente-list.component';

describe('AgenteListComponent', () => {
  let component: AgenteListComponent;
  let fixture: ComponentFixture<AgenteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
