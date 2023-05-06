import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { PlayersComponent } from './pages/players/players.component';
import { TeamListComponent } from './pages/admin/team/team-list/team-list.component';
import { PlayerListComponent } from './pages/admin/player/player-list/player-list.component';
import { UserListComponent } from './pages/admin/user/user-list/user-list.component';
import { PlayerAddComponent } from './pages/admin/player/player-add/player-add.component';
import { PlayerUpdateComponent } from './pages/admin/player/player-update/player-update.component';
import { TeamAddComponent } from './pages/admin/team/team-add/team-add.component';
import { TeamUpdateComponent } from './pages/admin/team/team-update/team-update.component';
import { UserAddComponent } from './pages/admin/user/user-add/user-add.component';
import { UserUpdateComponent } from './pages/admin/user/user-update/user-update.component';
import { TeamDetailsComponent } from './pages/team_details/team-details.component';
import { PlayerDetailsComponent } from './pages/player_details/player-details.component';
import { ConfirmationDialogComponent } from './pages/admin/confirmation-dialog/confirmation-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PlayersComponent,
    TeamListComponent,
    PlayerListComponent,
    UserListComponent,
    PlayerAddComponent,
    PlayerUpdateComponent,
    TeamAddComponent,
    TeamUpdateComponent,
    UserAddComponent,
    UserUpdateComponent,
    TeamDetailsComponent,
    PlayerDetailsComponent,
    ConfirmationDialogComponent,
    NavbarComponent,
    ProfileComponent,
    ErrorComponent,
  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
