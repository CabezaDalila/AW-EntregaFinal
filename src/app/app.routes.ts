import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './components/home/home.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { IndexComponent } from './components/index/index.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', 
    redirectTo: 'welcome',
    pathMatch: 'full' },
  { path: 'welcome',
    component: WelcomeComponent },
  { path: 'glossary',
    component: GlossaryComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path : '', 
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'stocks',
        component: StocksComponent
      },
      {
        path:'index',
        component:IndexComponent
      },
      {
        path:'crypto',
        component:CryptoComponent
      },
      {
        path:'portfolio',
        component: PortfolioComponent
      }
    ]
  },
  { path: '**', redirectTo: 'welcome' }
];