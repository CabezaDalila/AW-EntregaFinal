import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PruebaSupabaseService } from '../../Services/supabase.service';
@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-grid.component.html',
  styleUrls: ['./stats-grid.component.scss']
})
export class StatsGridComponent implements OnInit{
  availableCash:number = 0;
  cashChange = 2.5;
  totalInvested = 75000;
  investmentReturn = 12.5;
  totalReturn = 25000;
  roi = 33.3;
  constructor(public auth: AuthService, private supabase:PruebaSupabaseService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log("El usuario está autenticado");

        this.auth.user$.subscribe((user) => {
          console.log("Datos del usuario recibidos:", user);
          if (user?.email) {
            this.supabase.getDineroDisponible({ email: user.email })
              .then((data) => {
                console.log("Datos obtenidos:", data);
                this.availableCash=data.dineroDisponible;
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
