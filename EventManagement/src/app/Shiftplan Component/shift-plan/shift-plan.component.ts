import { Component, ElementRef, Injectable, QueryList, ViewChildren, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';

import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';

import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';



import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import Swiper from 'swiper';
import { ShiftCategoryComponent } from '../shift-category/shift-category.component';
import { AddCatDialogComponent } from 'src/app/Dialogs/shiftplan/add-cat-dialog/add-cat-dialog.component';


@Injectable()


@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss'],
  providers: [
    DatePipe, // Move DatePipe to providers array
  ],
  encapsulation: ViewEncapsulation.None
})



export class ShiftPlanComponent implements AfterViewInit {


  @ViewChildren('tab') tabElements!: QueryList<ElementRef>;
  @ViewChild('swiper', { static: false }) swiperContainer!: any;
  @ViewChild('addCatRef', { static: false }) addCatRef!: any;

  shouldReloadContent: boolean = true;

  catSlides: any = [];



  unlocked: boolean = false;



  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe, private dialog: MatDialog, private renderer: Renderer2) {

  }


  tabClick(elem: any, cat: any, id: number) {

    const clickedElement = elem.target;
    this.setActiveTab(clickedElement)
    this.goToPage(id);

  }

  setActiveTab(elem: any) {


    this.tabElements.forEach((element) => {

      this.renderer.removeClass(element.nativeElement, 'active');
    });

    this.renderer.addClass(elem, 'active');

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
        width: '95vh',
        height: 'auto',
      }

    );
  }
  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {

      },
      width: '95vh',
      height: 'auto',
    })
  }



  ngOnInit() {

    this.shiftplanService.editmode$.subscribe(value => {

      this.unlocked = value;

    })

    this.shiftplanService.updateCategories()

  }




  ngAfterViewInit() {
    // Access the QueryList of elements

    const swiper = this.swiperContainer.nativeElement.swiper

    swiper.on('slideChange', (swiper: any) => {

      this.setActiveTab(this.tabElements.get(swiper.activeIndex)?.nativeElement)
    });


  }

}


