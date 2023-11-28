export class EventModel {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
  
    constructor(
      id: number,
      name: string,
      description: string,
      startDate: Date,
      endDate: Date,
      location: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.location = location;
    }
   
  }