// "organization_id","name"
export class Organization {
  organization_id: string;
  name: string;

  constructor(organization_id: string, name: string) {
    this.organization_id = organization_id;
    this.name = name;
  }
}
