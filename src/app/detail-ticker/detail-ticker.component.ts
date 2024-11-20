import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../Services/supabase.service';
import { PurchaseResult } from '../interfaces/IpurchaseResult';

@Component({
  selector: 'app-detail-ticker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-ticker.component.html',
  styleUrls: ['./detail-ticker.component.scss']
})
export class DetailTicker {
  @Input() isOpen: boolean = false;
  @Input() symbol: string = '';
  @Input() price: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() buy = new EventEmitter<PurchaseResult>();

  quantity: number = 1;
  total: number = 0;
  userEmail?: string = '';
  isProcessing = new BehaviorSubject<boolean>(false);
  errorMessage: string = '';

  constructor(
    private supabase: SupabaseService, 
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.updateTotal();
    this.auth.user$.subscribe((user) => { 
      this.userEmail = user?.email;  
    });
  }

  updateTotal() {
    this.total = this.price * this.quantity;
  }

  onCancel() {
    if (!this.isProcessing.value) {
      this.close.emit();
    }
  }

  private validatePurchase(): boolean {
    if (!this.userEmail) {
      this.errorMessage = 'Debes iniciar sesión para realizar una compra';
      return false;
    }

    if (!this.quantity || this.quantity <= 0) {
      this.errorMessage = 'La cantidad debe ser mayor a 0';
      return false;
    }

    if (!this.total || this.total <= 0) {
      this.errorMessage = 'El total de la compra no es válido';
      return false;
    }

    return true;
  }

  async onBuy() {
    this.errorMessage = '';
    
    if (this.isProcessing.value) {
      return; // Evitar múltiples clicks
    }

    if (!this.validatePurchase()) {
      this.buy.emit({ 
        success: false, 
        error: this.errorMessage 
      });
      return;
    }

    this.isProcessing.next(true);

    try {
      await this.supabase.putTransaccion(
        this.userEmail!,
        this.symbol,
        this.quantity,
        this.price
      );

      // Solo si la transacción fue exitosa, emitimos el evento de compra
      this.buy.emit({ 
        success: true,
        quantity: this.quantity 
      });
      
      // Reiniciamos el formulario
      this.quantity = 1;
      this.updateTotal();
      
    } catch (error) {
      console.error('Error en la transacción:', error);
      this.errorMessage = 'Error al procesar la transacción. Por favor, intente nuevamente.';
      this.buy.emit({ 
        success: false,
        error: this.errorMessage 
      });
    } finally {
      this.isProcessing.next(false);
    }
  }
}