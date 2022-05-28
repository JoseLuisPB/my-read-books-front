import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAndSearchHolderComponent } from './page-and-search-holder.component';

describe('PageAndSearchHolderComponent', () => {
  let component: PageAndSearchHolderComponent;
  let fixture: ComponentFixture<PageAndSearchHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAndSearchHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAndSearchHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
