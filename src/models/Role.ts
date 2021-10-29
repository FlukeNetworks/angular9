export class Role {
  id: string;
  name: string;
  created_at: string;

  constructor(id: string, name: string, created_at: string) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
  }
}
