import {Component} from '@angular/core';
import {DataComponent} from "../../../../library/component/data.component";
import {UserPayload} from "../../../../../models/entity/user/user.payload";
import {UserFilter} from "../../../../../models/filter/user/user.filter";
import {Role} from "../../../../../models/entity/base/role.enum";
import {OrganisationId, SchoolId} from "../../../../../services/general/local-storage.service";
import {UserService} from "../../../../../services/http/user/user.service";

@Component({
  selector: 'app-sch-teachers',
  styleUrls: ['./sch-teachers.component.css'],
  template: `
    <app-table-list-users [title]="title" [role]="Role.TEACHER" [filter]="filter"></app-table-list-users>
  `
})
export class SchTeachersComponent implements DataComponent<UserPayload[]> {
  title: string = $localize `Teachers`;
  data: UserPayload[] = [];
  filter: UserFilter = new UserFilter({
    approved: true,
    role: Role.STUDENT,
    schoolId: SchoolId(),
    organisationId: OrganisationId()
  });
  protected readonly Role = Role;

  constructor(private _userService: UserService) {

  }
}
