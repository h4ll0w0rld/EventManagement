export class ShiftCategory {
  id: number;
  name: string;
  description: string;
  event_id: number;

  constructor(id: number, name: string, description: string, event_id: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.event_id = event_id;
  }
}