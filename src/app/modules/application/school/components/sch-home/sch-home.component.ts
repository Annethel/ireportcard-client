import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../../services/http/authentication/authentication.service";
import {EmptySchoolStats, SchoolStat} from "../../../../../models/entity/authentication/login.model";
import {LaunchFilter} from "../../../../../models/filter/auth/launch.filter";
import {SchoolId} from "../../../../../services/general/local-storage.service";

@Component({
  selector: 'app-sch-home',
  templateUrl: './sch-home.component.html',
  styleUrls: ['./sch-home.component.css']
})
export class SchHomeComponent implements OnInit {
  schoolStats: SchoolStat[] = EmptySchoolStats;
  users = [
    {id: 110, name: 'elroy', date: '11-11-23'},
    {id: 101, name: 'vince', date: '01-11-23'},
  ];
  posts = [
    {title: $localize `How to create class level`, date: '11-06-12'},
    {title: $localize `How to create subject`, date: '11-12-12'},
  ]

  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit() {
    const filter = new LaunchFilter({schoolId: SchoolId()});
    this._authService.launch(filter).subscribe(res => {
      if (res.schoolStats) {
        this.schoolStats[0].value = res.schoolStats.numberOfTeachers;
        this.schoolStats[1].value = res.schoolStats.numberOfStudents;
        this.schoolStats[2].value = res.schoolStats.numberOfDepartments;
        this.schoolStats[3].value = res.schoolStats.numberOfApplications;
      }
    });
  }
}
