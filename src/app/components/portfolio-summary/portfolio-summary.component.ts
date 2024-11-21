import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SupabaseService } from '../../Services/supabase.service';
@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss']
})
export class PortfolioSummaryComponent {
  totalPortfolio = 0;
  monthlyChange = 2.4;

  constructor (private supabase: SupabaseService, private auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log("El usuario está autenticado");

        this.auth.user$.subscribe((user) => {
          console.log("Datos del usuario recibidos:", user);
          if (user?.email) {
            this.supabase.getDataPortfolioUser({ email: user.email })
              .then((data) => {
                console.log("Datos obtenidos:", data);
                this.totalPortfolio= data.totalInvertido+data.dineroDisponible;
              })
              .catch((error) => {
                console.error("Error al obtener dinero disponible:", error);
              });
          } else {
            console.error("Email no disponible");
          }
        });
      } else {
        console.error("El usuario no está autenticado");
      }
    });
  }
}