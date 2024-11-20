
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupabaseService implements OnInit {

  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit() {
    // Observar cambios en el usuario autenticado
    this.auth.user$.subscribe((user) => {
      if (user?.email) {
        this.userEmailSubject.next(user.email);
      }
    });
  }

  pruebaSupabase () {
    const url= 'https://bmwuihgmnmblmdrkqiht.supabase.co/functions/v1/hello-world';
   return  this.http.post(url,{name:'emanuel'}).toPromise();
  }
 
  getDineroDisponible({email}: {email: string}): Promise<any> {
      const url = `https://bmwuihgmnmblmdrkqiht.supabase.co/functions/v1/transaccion?email=${email}`;
      return this.http.get<any>(url).toPromise();
  }

  putTransaccion(email: string, ticker: string, cantidad: number, precio: number): Promise<any> {
    const url = 'https://bmwuihgmnmblmdrkqiht.supabase.co/functions/v1/transaccion';
    const body = {email: email, ticker: ticker, cantidad: cantidad, precio: precio};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' });
    return this.http.put<any>(url, body, { headers }).toPromise();
  }
}


