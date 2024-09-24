import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicReportComponent } from './epic-report.component';

describe('EpicReportComponent', () => {
  let component: EpicReportComponent;
  let fixture: ComponentFixture<EpicReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
