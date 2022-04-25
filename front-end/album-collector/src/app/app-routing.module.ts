import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsGridComponent } from './albums-grid/albums-grid.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { StickersGridComponent } from './stickers-grid/stickers-grid.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'albums/:id', component: StickersGridComponent },
  { path: 'albums', component: AlbumsGridComponent },
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: '**', redirectTo: 'albums', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
