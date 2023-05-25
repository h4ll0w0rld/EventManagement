import { Activity } from "../Object Models/Shiftplan Component/activityModel";
import { CategoryContent } from "../Object Models/Shiftplan Component/category-content";
import { Shift } from "../Object Models/Shiftplan Component/shift";
import { User } from "../Object Models/user/shiftplanModel";

export const categoriesContent:CategoryContent[] = [
    new CategoryContent(0, "_Bar","descriptiooon",60, [ 
        new Shift(0, 2, [
          new Activity(1, new User(1, "Herbert" ,"Gröneeier"), true),
          new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
          new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
          new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
          new Activity(1, new User(1, "Herbert"," Gröneeier"), true),
          new Activity(1,new User(1, "Mister ","Knister"), true) ]),
        new Shift(0, 2, [
          new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
          new Activity(1,new User(1, "Mister"," Knister"), true),
          new Activity(1, new User(1, "Herbert" ,"Gröneeier"), true),
          new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
          new Activity(1, new User(1, "",""), true),
          new Activity(1, new User(1, "",""), true),]),
        new Shift(2, 4, [new Activity(1, new User(1, "Denise"," Kriese"), true),
          new Activity(1,new User(1, "Marie ","Ju"), true)]), 
        new Shift(4, 6, [
          new Activity(1, new User(1, "Herbert", "Gröneeier"), true),
          new Activity(1,new User(1, "Mister ","Knister"), true)]),
        new Shift(6, 8, [
          new Activity(1, new User(1, "Herbert"," Gröneeier"), true),
          new Activity(1,new User(1, "Mister"," Knister"), true)])]),

    new CategoryContent(0, "_Sicherheit","descriptiooon",60, [
        new Shift(0, 2, [ 
            
            new Activity(1, new User(1, "Ben ","Sicherer"), true),
            new Activity(1, new User(1, "John ","Safetyson"), true),
            new Activity(1, new User(1, "Jane ","Smith"), true),
            new Activity(1, new User(1, "Herbert" ,"Gröneeier"), true),
            new Activity(1, new User(1, "Herbert"," Gröneeier"), true),
            new Activity(1, new User(1, "Mister ","Knister"), true) ]),
        new Shift(0, 2, [
            new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
            new Activity(1,new User(1, "Mister"," Knister"), true) ]),
          new Shift(2, 4, [new Activity(1, new User(1, "Denise"," Kriese"), true),
            new Activity(1,new User(1, "Marie ","Ju"), true)]), 
          new Shift(4, 6, [
            new Activity(1, new User(1, "Herbert", "Gröneeier"), true),
            new Activity(1,new User(1, "Mister ","Knister"), true)]),
          new Shift(6, 8, [
            new Activity(1, new User(1, "Herbert"," Gröneeier"), true),
            new Activity(1,new User(1, "Mister"," Knister"), true)])]),
     
      
    new CategoryContent(0, "_Technik","descriptiooon",60, [
        new Shift(0, 2, [ 
            new Activity(1, new User(1, "Herbert", "Gröneeier"), true),
            new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
            new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
            new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
            new Activity(1, new User(1, "Herbert"," Gröneeier"), true),
            new Activity(1, new User(1, "Mister ","Knister"), true) ]),
        new Shift(0, 2, [
            new Activity(1, new User(1, "Herbert ","Gröneeier"), true),
            new Activity(1,new User(1, "Mister"," Knister"), true) ]),
      new Shift(2, 4, [new Activity(1, new User(1, "Denise"," Kriese"), true),
        new Activity(1,new User(1, "Marie ","Ju"), true)]), 
      new Shift(4, 6, [
        new Activity(1, new User(1, "Herbert", "Gröneeier"), true),
        new Activity(1,new User(1, "Mister ","Knister"), true)]),
      new Shift(6, 8, [
        new Activity(1, new User(1, "Herbert"," Gröneeier"), true),
        new Activity(1,new User(1, "Mister"," Knister"), true)])]),
   

  ];