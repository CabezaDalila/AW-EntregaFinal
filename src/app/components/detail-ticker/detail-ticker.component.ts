import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from '../../Services/supabase.service';
import { PurchaseResult } from '../../interfaces/IpurchaseResult';


@Component({
  selector: 'app-detail-ticker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-ticker.component.html',
  styleUrls: ['./detail-ticker.component.scss'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('notificationAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class DetailTickerComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() symbol: string = '';
  @Input() price: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() buy = new EventEmitter<PurchaseResult>();

  quantity: number = 1;
  total: number = 0;
  userEmail?: string = '';
  private _isProcessing = new BehaviorSubject<boolean>(false);
  isProcessing: Observable<boolean> = this._isProcessing.asObservable();
  errorMessage: string = '';
  successMessage: string = '';
  showNotification = false;

  constructor(
    private supabase: SupabaseService, 
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.updateTotal();
    this.auth.user$.subscribe((user) => { 
      this.userEmail = user?.email;
    });
    document.body.classList.add('modal-open');
  }

  ngOnDestroy() {
    document.body.classList.remove('modal-open');
  }

  incrementQuantity() {
    this.quantity++;
    this.updateTotal();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  setQuantity(amount: number) {
    this.quantity = amount;
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.price * this.quantity;
  }

  onCancel() {
    if (!this._isProcessing.value) {
      this.resetState();
      this.close.emit();
    }
  }

  private resetState() {
    this.quantity = 1;
    this.errorMessage = '';
    this.successMessage = '';
    this.showNotification = false;
    this.updateTotal();
  }

  private validatePurchase(): boolean {
    if (!this.userEmail) {
      this.showError('Debes iniciar sesión para realizar una compra');
      return false;
    }

    if (!this.quantity || this.quantity <= 0) {
      this.showError('La cantidad debe ser mayor a 0');
      return false;
    }

    // if (!this.total || this.total <= 0) {
    //   this.showError('El total de la compra no es válido');
    //   return false;
    // }

    return true;
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }

  async onBuy() {
    if (this._isProcessing.value) {
      return;
    }

    if (!this.validatePurchase()) {
      this.buy.emit({ 
        success: false, 
        error: this.errorMessage 
      });
      return;
    }

    this._isProcessing.next(true);

    try {
      await this.supabase.putTransaccion(
        this.userEmail!,
        this.symbol,
        this.quantity,
        this.price
      );

      this.showSuccess(`¡Compra exitosa! Has adquirido ${this.quantity} acciones de ${this.symbol}`);
      this.buy.emit({ 
        success: true,
        quantity: this.quantity 
      });
      
      setTimeout(() => {
        this.resetState();
        this.close.emit();
      }, 2000);
      
    } catch (error) {
      console.error('Error en la transacción:', error);
      this.showError('Error al procesar la transacción. Por favor, intente nuevamente.');
      this.buy.emit({ 
        success: false,
        error: this.errorMessage 
      });
    } finally {
      this._isProcessing.next(false);
    }
  }
}