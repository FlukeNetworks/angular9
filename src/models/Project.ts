// "id","organization_id","user_id","name","created_at"
export class Project {
  id: string;
  organization_id: string;
  user_id: string;
  name: string;
  created_at: string;

  constructor(id: string, organization_id: string, user_id: string, name: string, created_at: string) {
    this.id = id;
    this.organization_id = organization_id;
    this.user_id = user_id;
    this.name = name;
    this.created_at = created_at;
  }
}
