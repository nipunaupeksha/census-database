import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndpointUtillService } from './services/endpoint-utill.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule],
  providers: [EndpointUtillService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
