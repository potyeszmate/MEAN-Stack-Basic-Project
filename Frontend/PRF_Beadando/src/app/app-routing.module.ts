import { AuthguardGuard } from './guard/authguard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeamListComponent } from './pages/admin/team/team-list/team-list.component';
import { PlayerListComponent } from './pages/admin/player/player-list/player-list.component';
import { UserListComponent } from './pages/admin/user/user-list/user-list.component';
import { TeamAddComponent } from './pages/admin/team/team-add/team-add.component';
import { PlayerAddComponent } from './pages/admin/player/player-add/player-add.component';
import { UserAddComponent } from './pages/admin/user/user-add/user-add.component';
import { UserUpdateComponent } from './pages/admin/user/user-update/user-update.component';
import { TeamUpdateComponent } from './pages/admin/team/team-update/team-update.component';
import { PlayerUpdateComponent } from './pages/admin/player/player-update/player-update.component';
import { TeamDetailsComponent } from './pages/team_details/team-details.component';
import { PlayerDetailsComponent } from './pages/player_details/player-details.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},

  //Teams and players
  {path: 'home', component: HomeComponent, canActivate: [AuthguardGuard]},
  {path: 'players/:id', component: PlayersComponent, canActivate: [AuthguardGuard]},
  //Admin list
  {path: 'admin-players', component: PlayerListComponent, canActivate: [AuthguardGuard]},
  {path: 'admin-teams', component: TeamListComponent, canActivate: [AuthguardGuard]},
  {path: 'admin-users', component: UserListComponent, canActivate: [AuthguardGuard]},
  //Admin add
  {path: 'admin-players-add', component: PlayerAddComponent, canActivate: [AuthguardGuard]},
  {path: 'admin-teams-add', component: TeamAddComponent, canActivate: [AuthguardGuard]},
  {path: 'admin-users-add', component: UserAddComponent, canActivate: [AuthguardGuard]},

  //Admin update
  {path: 'admin-players-update/:id', component: PlayerUpdateComponent, canActivate: [AuthguardGuard]},
  {path: 'admin-teams-update/:id', component: TeamUpdateComponent, canActivate: [AuthguardGuard]},
  {path: 'admin-users-update/:id', component: UserUpdateComponent, canActivate: [AuthguardGuard]},

  //Details
  {path: 'teamdetails/:id', component: TeamDetailsComponent, canActivate: [AuthguardGuard]},
  {path: 'playerdetails/:teamid/:playerid', component: PlayerDetailsComponent, canActivate: [AuthguardGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthguardGuard]},


  //Error 404
  {path: '**', component: ErrorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
