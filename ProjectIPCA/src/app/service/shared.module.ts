import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { ServiceComponent } from './service.component';
import { LoginPageComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { EventsComponent } from './components/events/events.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatButtonModule, MatDialogModule, MatTooltipModule, MatRadioModule, MatCheckboxModule } from "@angular/material";
import { MatPaginatorModule } from "@angular/material";
import { MatProgressSpinnerModule } from "@angular/material";
import { MatSortModule } from "@angular/material";
import { MatIconModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { UserEventsComponent } from './components/user-events/user-events.component';
import { UsersComponent } from './components/users/users.component';
import { EventInformationComponent } from './components/event-information/event-information.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { EventInformationFromParticipationsComponent } from './components/event-information-from-participations/event-information-from-participations.component';
import { SalariesComponent } from './components/salaries/salaries.component';
import { SalariesEventComponent } from './components/salaries-event/salaries-event.component';


@NgModule({
  declarations: [
    ServiceComponent,
    ColumnOneComponent,
    LoginPageComponent,
    RegisterComponent,
    EventsComponent,
    AddUserComponent,
    AddEventComponent,
    EditEventComponent,
    UserEventsComponent,
    UsersComponent,
    EventInformationComponent,
    UserInformationComponent,
    EventInformationFromParticipationsComponent,
    SalariesComponent,
    SalariesEventComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    FlashMessagesModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [FlashMessagesService],
  exports: [ColumnOneComponent, ServiceComponent, LoginPageComponent, RegisterComponent],
  entryComponents: [EventsComponent, EditEventComponent, AddEventComponent,
    EventInformationComponent, UserInformationComponent, EventInformationFromParticipationsComponent,
    SalariesEventComponent]
})
export class SharedModule { }
