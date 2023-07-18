import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/http/user/user.service";
import {TableModel} from "../../../../library/crud/models/table.model";
import {UserUtil} from "../../../../../utils/user.util";

@Component({
  selector: 'app-org-members',
  templateUrl: './org-members.component.html',
  styleUrls: ['./org-members.component.css']
})
export class OrgMembersComponent implements OnInit {
  table?: TableModel;

  constructor(private _userService: UserService,) {
  }

  ngOnInit(): void {
    this._userService.getAllByOrganisation().subscribe(res => {
      this.table = UserUtil.createTable(res, $localize `Members`);
    })
  }
}
