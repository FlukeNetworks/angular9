import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Role } from 'src/models/Role';
import { UserRole } from 'src/models/UserRole';

import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from "@angular/material/paginator"
import { Organization } from 'src/models/Organization';
import { Project } from 'src/models/Project';


@Component({
  selector: "projects-by-org",
  templateUrl: "./projects-by-org.component.html",
  styleUrls: ['projects-by-org.component.css'],
})
export class ProjectsByOrgComponent implements OnInit {

  public orgArray: Organization[] = [];
  public projectsArray: Project[] = [];

  public orgngModel: any;
  displayedColumns = ['id','organization_id', 'user_id', 'name', 'created_at'];
  dataSource = new MatTableDataSource<Project>(this.projectsArray);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.getOrganizations();
    this.getProjects();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private http: HttpClient) {
  }

  private getOrganizations() {
    this.http.get('assets/organizations.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.orgArray.push(new Organization(row[0], row[1]));
          }
          //  console.log(this.orgArray);
        },
        error => {
          console.log(error);
        }
      );
  }

  private getProjects() {
    this.http.get('assets/projects.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.projectsArray.push(new Project(row[0], row[1], row[2], row[3], row[4]));
          }
          // console.log(this.projectsArray);
          this.displayedColumns = ['id','organization_id', 'user_id', 'name', 'created_at'];
          this.dataSource = new MatTableDataSource<Project>(this.projectsArray);

        },
        error => {
          console.log(error);
        }
      );
  }

  onOrgSelect(selectedOrg: any) {
    let orgID = selectedOrg.replaceAll('"', "");
    let filteredProjects = this.projectsArray.filter(project => project.organization_id === orgID)
    this.dataSource = new MatTableDataSource<Project>(filteredProjects);
    this.dataSource.paginator = this.paginator;
  }
}

