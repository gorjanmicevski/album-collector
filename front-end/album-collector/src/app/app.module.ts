import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AlbumsGridComponent } from './albums-grid/albums-grid.component';
import { FeedComponent } from './feed/feed.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StickersGridComponent } from './stickers-grid/stickers-grid.component';
import { PostPopUpFormComponent } from './post-pop-up-form/post-pop-up-form.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AlbumsPopUpComponent } from './albums-pop-up/albums-pop-up.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AlbumsGridComponent,
    FeedComponent,
    UserProfileComponent,
    StickersGridComponent,
    PostPopUpFormComponent,
    LoginComponent,
    AlbumsPopUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    InfiniteScrollModule,
    NoopAnimationsModule,
    FormsModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
