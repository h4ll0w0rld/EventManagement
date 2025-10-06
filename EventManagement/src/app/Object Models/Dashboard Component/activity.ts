import { User } from "./user";

export class Activity {
  id: number;
  status: string;
  description: string | null;
  shift_id: number;
  user_id: number;
  user: User;

  constructor(
    id: number,
    status: string,
    description: string | null,
    shift_id: number,
    user_id: number,
    user: User
  ) {
    this.id = id;
    this.status = status;
    this.description = description;
    this.shift_id = shift_id;
    this.user_id = user_id;
    this.user = user;
  }
}
