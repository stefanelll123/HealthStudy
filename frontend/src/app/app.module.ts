import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from 'src/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ToastComponent } from './components/toast/toast.component';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { StudiesComponent } from './features/studies/studies.component';
import { FeedbackComponent } from './features/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ToastComponent,
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    StudiesComponent,
    FeedbackComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
