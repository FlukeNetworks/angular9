// "id","name","project_id","cable_type","date","status","created_at"
export class Label {
  id: string;
  name: string;
  project_id: string;
  cable_type: string;
  date: string;
  status: string;
  created_at: string;

  constructor(id: string, name: string, project_id: string, cable_type: string, date: string, status: string, created_at: string) {
    this.id = id;
    this.name = name;
    this.project_id = project_id;
    this.cable_type = cable_type;
    this.date = date;
    this.status = status;
    this.created_at = created_at;
  }
}
