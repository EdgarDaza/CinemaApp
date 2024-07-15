import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  NavController,
} from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router, NavigationEnd } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
})

export class AppComponent {
  
  showHeader: boolean = false;
  showFooter: boolean = false;

  // headerRoutes: string[] = ['/about-us', '/my-credit-cards'];
  // footerRoutes: string[] = ['/home', '/comingsoon','/profile'];
  // bugs  with this implementation
  headerRoutes: string[] = ['']; 
  footerRoutes: string[] = [''];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.headerRoutes.some(route => event.urlAfterRedirects.startsWith(route));
        this.showFooter = this.footerRoutes.some(route => event.urlAfterRedirects.startsWith(route));
      }
    });
  }
  
  // constructor(private navController: NavController) {}

  // redirectToPage(page: string) {
  //   this.navController.navigateForward(page);
  // }
}