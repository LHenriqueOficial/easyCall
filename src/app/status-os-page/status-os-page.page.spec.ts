import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusOsPagePage } from './status-os-page.page';

describe('StatusOsPagePage', () => {
  let component: StatusOsPagePage;
  let fixture: ComponentFixture<StatusOsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusOsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusOsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
