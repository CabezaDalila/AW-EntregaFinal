import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'glossary',
    component: GlossaryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'asset/:symbol',  // Esta es la ruta para el detalle del activo
        component: AssetDetailComponent
      },
      {
        path: 'quotes',
        component: QuotesComponent
      },
      {
        path: 'portfolio',
        component: PortfolioComponent
      }
    ]
  },
  { path: '**', redirectTo: 'welcome' }
];