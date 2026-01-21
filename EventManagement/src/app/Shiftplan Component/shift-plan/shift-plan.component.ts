import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
  Renderer2,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { ShiftplanService } from 'src/app/core/features/shiftplan/shiftplan.service';
import { AddCatDialogComponent } from 'src/app/Dialogs/shiftplan/add-cat-dialog/add-cat-dialog.component';
import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';
import { EventService } from 'src/app/core/features/events/event.service';
import { combineLatest, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})
export class ShiftPlanComponent implements OnInit, AfterViewInit {

  @ViewChildren('tab') tabElements!: QueryList<ElementRef>;
  @ViewChild('swiper') swiperContainer!: any;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  categories: CategoryContent[] = [];
  activeSlideIndex = 0;
  unlocked = true;

  private savedScrollTop = 0;
  private restoringScroll = false;

  constructor(
    public shiftplanService: ShiftplanService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    public eventService: EventService
  ) {}

  // ===================== INIT =====================

  ngOnInit(): void {
    combineLatest([
      this.eventService.currentEvent$.pipe(filter(Boolean)),
      this.eventService.refreshCategories$
    ])
      .pipe(
        switchMap(() => this.eventService.updateCategories())
      )
      .subscribe(cats => {

        // 🔹 Save scroll position BEFORE DOM updates
        if (this.scrollContainer) {
          this.savedScrollTop = this.scrollContainer.nativeElement.scrollTop;
          this.restoringScroll = true;
        }

        const prevCatId = this.eventService.currentCategory?.id;
        this.categories = cats;

        if (!cats.length) return;

        const idx = prevCatId
          ? cats.findIndex(c => c.id === prevCatId)
          : 0;

        const safeIndex = idx >= 0 ? idx : 0;

        // 🔹 Restore AFTER Angular + Swiper render
        queueMicrotask(() => {
          requestAnimationFrame(() => {

            this.bindSwiper();
            this.setActiveSlide(safeIndex, false);
            this.eventService.setCurrentCategory(cats[safeIndex]);

            if (this.restoringScroll && this.scrollContainer) {
              this.scrollContainer.nativeElement.scrollTop = this.savedScrollTop;
              this.restoringScroll = false;
            }

          });
        });

      });

    // Sync tab when category changes externally
    this.eventService.currentCat$.subscribe(cat => {
      if (!cat) return;
      const idx = this.categories.findIndex(c => c.id === cat.id);
      if (idx >= 0) {
        this.setActiveSlide(idx, false);
      }
    });
  }

  ngAfterViewInit(): void {}

  // ===================== TRACKING =====================

  trackByCatId(index: number, cat: CategoryContent): number {
    return cat.id;
  }

  // ===================== CATEGORY =====================

  getActiveCat(): CategoryContent | null {
    return this.categories[this.activeSlideIndex] ?? null;
  }

  setActiveSlide(index: number, scroll = true): void {
    this.activeSlideIndex = index;

    if (this.swiperContainer?.nativeElement?.swiper) {
      this.goToPage(index);
    }

    if (scroll) {
      this.scrollToActive();
    }
  }

  bindSwiper(): void {
    setTimeout(() => {
      const swiper = this.swiperContainer?.nativeElement?.swiper;
      if (!swiper) return;

      swiper.off('slideChange');

      swiper.on('slideChange', () => {
        this.activeSlideIndex = swiper.activeIndex;

        const tabElem = this.tabElements.get(this.activeSlideIndex)?.nativeElement;
        this.setActiveTab(tabElem);

        const cat = this.getActiveCat();
        if (cat) this.eventService.setCurrentCategory(cat);
      });
    });
  }

  tabClick(event: any, cat: CategoryContent, index: number): void {
    this.setActiveTab(event.target);
    this.setActiveSlide(index, true);
    this.eventService.setCurrentCategory(cat);
  }

  // ===================== UI HELPERS =====================

  setActiveTab(elem: HTMLElement): void {
    this.tabElements.forEach(tab =>
      this.renderer.removeClass(tab.nativeElement, 'active')
    );
    if (elem) {
      this.renderer.addClass(elem, 'active');
    }
    this.scrollToActive();
  }

  goToPage(page: number): void {
    const swiperEl = this.swiperContainer?.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.slideTo(page, 400);
    }
  }

  scrollToActive(): void {
    const actElem = document.querySelector('.active');
    if (actElem) {
      actElem.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }

  // ===================== DIALOGS =====================

  addCatDialog(): void {
    this.dialog.open(AddCatDialogComponent, {
      width: '90vw',
      maxWidth: '768px',
      height: 'auto'
    });
  }

  delCatDialog(cat: CategoryContent): void {
    const dialogRef = this.dialog.open(DelCatDialogComponent, {
      data: {
        message: `Möchtest du ${cat.name} wirklich löschen?`,
        catId: cat.id
      },
      width: '90vw',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok === true) {
        this.eventService.deleteCategory(cat.id).subscribe(() => {
          this.eventService.updateCategories().subscribe(cats => {
            this.categories = cats;
          });
        });
      }
    });
  }
}
