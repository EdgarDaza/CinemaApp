import { Routes } from '@angular/router';
import { ProfilePage } from './pages/profile/profile.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'comingsoon',
    loadComponent: () => import('./pages/coming-soon/coming-soon.page').then(m => m.ComingsoonPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'my-tickets',
    loadComponent: () => import('./pages/profile/my-tickets/my-tickets.page').then(m => m.MyTicketsPage)
  },
  {
    path: 'my-credit-cards',
    loadComponent: () => import('./pages/profile/my-credit-cards/my-credit-cards.page').then(m => m.MyCreditCardsPage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/profile/about-us/about-us.page').then(m => m.AboutUsPage)
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/profile/test/test.page').then(m => m.TestPage)
  },
  // {
  //   path: 'profile',
  //   loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  //     },
  //     {
  //       path: 'test',
  //       loadComponent: () => import('./profile/test/test.page').then(m => m.TestPage)
  //     },
  //   ]
  // },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'start1',
    loadComponent: () => import('./pages/start/start1/start1.page').then( m => m.Start1Page)
  },
  {
    path: 'start2',
    loadComponent: () => import('./pages/start/start2/start2/start2.page').then( m => m.Start2Page)
  },
  {
    path: 'selection',
    loadComponent: () => import('./pages/selection/selection.page').then( m => m.SelectionPage)
  },
  {
    path: 'seats',
    loadComponent: () => import('./pages/seats/seats.page').then( m => m.SeatsPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'invoice',
    loadComponent: () => import('./pages/invoice/invoice.page').then( m => m.InvoicePage)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation.page').then( m => m.ConfirmationPage)
  },
  {
    path: 'user-data',
    loadComponent: () => import('./pages/user-data/user-data.page').then( m => m.UserDataPage)
  },
  {
    path: 'coming-soon-4',
    loadComponent: () => import('./pages/coming-soon/coming-soon-4/coming-soon-4/coming-soon-4.page').then( m => m.ComingSoon4Page)
  },
  {
    path: 'coming-soon-2',
    loadComponent: () => import('./pages/coming-soon/coming-soon-2/coming-soon-2/coming-soon-2.page').then( m => m.ComingSoon2Page)
  },
  {
    path: 'coming-soon-5',
    loadComponent: () => import('./pages/coming-soon/coming-soon-5/coming-soon-5/coming-soon-5.page').then( m => m.ComingSoon5Page)
  },
  {
    path: 'coming-soon-3',
    loadComponent: () => import('./pages/coming-soon/coming-soon-3/coming-soon-3/coming-soon-3.page').then( m => m.ComingSoon3Page)
  },  {
    path: 'start3',
    loadComponent: () => import('./pages/start/start3/start3/start3.page').then( m => m.Start3Page)
  },
  {
    path: 'start4',
    loadComponent: () => import('./pages/start/start4/start4/start4.page').then( m => m.Start4Page)
  },

  








  // {
  //   path: '**',
  //   redirectTo: '/home',
  // },
];
