import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Role } from 'src/models/Role';
import { UserRole } from 'src/models/UserRole';

import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from "@angular/material/paginator"


@Component({
  selector: "user-by-role",
  templateUrl: "./user-by-role.component.html",
  styleUrls: ['user-by-role.component.css'],
})
export class UserByRoleComponent implements OnInit {

  public roleArray: Role[] = [];
  public userRoleArray: UserRole[] = [];

  public rolengModel: any;
  displayedColumns = ['user_id','fname', 'lname', 'role_id', 'created_at'];
  dataSource = new MatTableDataSource<UserRole>(this.userRoleArray);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.getRoles();
    this.getUserRoles();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private http: HttpClient) {
  }

  private getRoles() {
    this.http.get('assets/roles.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.roleArray.push(new Role(row[0], row[1], row[2]));
          }
          // console.log(this.roleArray);
          throw new Error('Unhandled exception occured!!!!');
        },
        error => {
          console.log(error);
        }
      );
  }

  private getUserRoles() {
    this.http.get('assets/userRoles.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.userRoleArray.push(new UserRole(row[0], row[1], row[2], row[3], row[4], row[5]));
          }
          // console.log(this.userRoleArray);
          this.displayedColumns = ['fname', 'created_at', 'id', 'user_id', 'role_id'];
          this.dataSource = new MatTableDataSource<UserRole>(this.userRoleArray);

        },
        error => {
          console.log(error);
        }
      );
  }

  onRoleSelect(selectedRole: any) {
    let filteredUsers = this.userRoleArray.filter(user => user.role_id == selectedRole.replaceAll('"', ""))
    this.dataSource = new MatTableDataSource<UserRole>(filteredUsers);
    this.dataSource.paginator = this.paginator;
  }
}

