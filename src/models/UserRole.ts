// "id","user_id","role_id","created_at"

export class UserRole {
  id: string;
  user_id: string;
  role_id: string;
  created_at: string;
  fname: string;
  lname: string;

  constructor(id: string, user_id: string, role_id: string, created_at: string, fname: string, lname: string) {
    this.id = id;
    this.user_id = user_id;
    this.role_id = role_id
    this.created_at = created_at;
    this.fname = fname;
    this.lname = lname;
  }
}
