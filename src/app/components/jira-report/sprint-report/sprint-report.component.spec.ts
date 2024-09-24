import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintReportComponent } from './sprint-report.component';

describe('ReportComponent', () => {
  let component: SprintReportComponent;
  let fixture: ComponentFixture<SprintReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
