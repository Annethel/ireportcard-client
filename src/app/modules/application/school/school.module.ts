import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchoolRoutingModule} from './school-routing.module';
import {SchHomeComponent} from './components/sch-home/sch-home.component';
import {SchStudentsComponent} from './components/sch-students/sch-students.component';
import {LibraryModule} from "../../library/library.module";
import {SchClassesComponent} from './components/sch-classes/sch-classes.component';
import {SchCoursesComponent} from './components/sch-courses/sch-courses.component';
import {SchDashboardComponent} from './components/sch-dashboard/sch-dashboard.component';
import {SchStudentsAddComponent} from './components/sch-students-add/sch-students-add.component';
import {SchTeachersComponent} from './components/sch-teachers/sch-teachers.component';
import {SchTeachersAddComponent} from './components/sch-teachers-add/sch-teachers-add.component';
import {SchClassesAddComponent} from './components/sch-classes-add/sch-classes-add.component';
import {SchDepartmentsAddComponent} from './components/sch-departments-add/sch-departments-add.component';
import {SchDepartmentsViewComponent} from './components/sch-departments-view/sch-departments-view.component';
import {SchDepartmentsComponent} from './components/sch-departments/sch-departments.component';
import {SchSettingsComponent} from './components/sch-settings/sch-settings.component';
import {SchSettingsFeesComponent} from './components/sch-settings-fees/sch-settings-fees.component';
import {SchSettingsCyclesComponent} from './components/sch-settings-cycles/sch-settings-cycles.component';
import {SchSettingsEmailComponent} from './components/sch-settings-email/sch-settings-email.component';
import {SchSettingsGeneralComponent} from './components/sch-settings-general/sch-settings-general.component';
import {SchSettingsOtherComponent} from './components/sch-settings-other/sch-settings-other.component';
import {SchAcadCycleComponent} from './components/sch-acad-cycle/sch-acad-cycle.component';
import { SchClassViewComponent } from './components/sch-class-view/sch-class-view.component';


@NgModule({
  declarations: [
    SchHomeComponent,
    SchStudentsComponent,
    SchClassesComponent,
    SchCoursesComponent,
    SchDashboardComponent,
    SchStudentsAddComponent,
    SchTeachersComponent,
    SchTeachersAddComponent,
    SchClassesAddComponent,
    SchDepartmentsAddComponent,
    SchDepartmentsViewComponent,
    SchDepartmentsComponent,
    SchSettingsComponent,
    SchSettingsFeesComponent,
    SchSettingsCyclesComponent,
    SchSettingsEmailComponent,
    SchSettingsGeneralComponent,
    SchSettingsOtherComponent,
    SchAcadCycleComponent,
    SchClassViewComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    LibraryModule
  ]
})
export class SchoolModule {
}
