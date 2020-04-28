import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetorPagePage } from './setor-page.page';

describe('SetorPagePage', () => {
  let component: SetorPagePage;
  let fixture: ComponentFixture<SetorPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
