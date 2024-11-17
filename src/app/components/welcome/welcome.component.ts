import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { FeatureCards } from '../featureCards/featureCards.component';
import { FooterComponent } from '../footer/footer.component';
import { InvestmentQuizComponent } from '../investment-quiz/investment-quiz.component';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent, FeatureCards,FooterComponent, InvestmentQuizComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated) {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  login() {
    this.auth.loginWithRedirect();
  }
}