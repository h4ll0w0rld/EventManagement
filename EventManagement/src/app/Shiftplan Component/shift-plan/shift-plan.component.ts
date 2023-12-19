import { Component, ElementRef, Injectable, QueryList, ViewChildren, ViewEncapsulation, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddCatDialogComponent } from 'src/app/Dialogs/shiftplan/add-cat-dialog/add-cat-dialog.component';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Injectable()

@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss'],
  providers: [
    DatePipe, // Move DatePipe to providers array
  ],
  //encapsulation: ViewEncapsulation.None
})


export class ShiftPlanComponent implements AfterViewInit {

  @ViewChildren('tab') tabElements!: QueryList<ElementRef>;
  @ViewChild('swiper', { static: false }) swiperContainer!: any;
  @ViewChild('addCatRef', { static: false }) addCatRef!: any;
  @ViewChild('activeTab') activeTabRef!: ElementRef;

  shouldReloadContent: boolean = true;
  catSlides: any = [];
  unlocked: boolean = false;
  categories: CategoryContent[] = []
  activeSlideIndex = 0;
 

  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog, private renderer: Renderer2, public eventService: EventServiceService) {
    this.eventService.currentCatSubject.next(this.getActiveCat())
  }

  tabClick(elem: any, cat: any, id: number) {

    const clickedElement = elem.target;
    this.setActiveTab(clickedElement)
    this.eventService.setCurrCat(this.getActiveCat())

  }
  getActiveCat() {
    return this.categories[this.activeSlideIndex];
  }

  setActiveSlide(index: number) {

    this.activeSlideIndex = index;
    this.eventService.setCurrCat(this.getActiveCat())
    //this.scrollToActiveTab();
    this.goToPage(index);
    this.scrollToActive();

  }

  scrollToActive() {

    const actElem = document.querySelector('.active');

    if (actElem) {

      actElem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }

  
  setActiveTab(elem: any) {

    this.tabElements.forEach((element) => {

      this.renderer.removeClass(element.nativeElement, 'active');
    });

    this.renderer.addClass(elem, 'active');
    this.scrollToActive();

  }

  goToPage(pageNumber: number) {

    const swiperEl = this.swiperContainer.nativeElement
    swiperEl.swiper.slideTo(pageNumber, 400);


  }

  delCatDialog(_cat: CategoryContent) {

    let delMessage = "Möchtest du " + _cat.name + " wirklich löschen?";

    let dialogRef = this.dialog.open(DelCatDialogComponent,
      {
        data: {
          message: delMessage,
          catId: _cat.id
        },
        width: '90vw',
        height: 'auto',
      }

    );
  }

  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {},
      width: '90vw',
      height: 'auto',
    })
  }

  ngOnInit() {

    this.shiftplanService.editmode$.subscribe(value => {

      this.unlocked = value;
    })

    this.eventService.categories.subscribe((categories: CategoryContent[]) => {
      this.categories = categories;
      // Do something with the received categories in this component
    });

    this.eventService.updateCategories()

  }

  ngAfterViewInit() {

    const swiper = this.swiperContainer.nativeElement.swiper

    swiper.on('slideChange', (swiper: any) => {
     
      this.activeSlideIndex = swiper.activeIndex
      this.setActiveTab(this.tabElements.get(swiper.activeIndex)?.nativeElement)
    });
    this.eventService.updateCategories()

  }
}


