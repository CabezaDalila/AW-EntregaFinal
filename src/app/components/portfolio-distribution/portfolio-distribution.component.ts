import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Asset } from '../../interfaces/Iasset';
import { Transaction } from '../../interfaces/ITransaction';
import { SupabaseService } from '../../Services/supabase.service';
@Component({
  selector: 'app-portfolio-distribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-distribution.component.html',
  styleUrls: ['./portfolio-distribution.component.scss'],
})
export class PortfolioDistributionComponent implements OnInit {
  showTransactionsModal = false;
  expandedTransactionId: string | null = null;
  dateFilter: string = '';
  searchQuery: string = '';
  assetDistribution: Asset[] = [
    { name: '', percentage: 0, color: '' },
    { name: '', percentage: 0, color: '' },
  ];
  allTransactions: Transaction[] = [];
  availableStock: number = 0;
  totalInvested: number = 0;
  dataTransaction = [];

  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.user$.subscribe((user) => {
          if (user?.email) {
            this.supabase
              .getDataPortfolioUser({ email: user.email })
              .then((data) => {
                this.availableStock = data.dineroDisponible;
                this.totalInvested = data.totalInvertido;

                if (data.transaccionAllData) {
                  this.allTransactions = data.transaccionAllData.map(
                    (item: any) => ({
                      ticker: item.ticker,
                      id: item.id,
                      type: item.tipoTransaccion === 'buy' ? 'buy' : 'sell',
                      amount: parseFloat(
                        ((item.cantidad ?? 0) * (item.precio ?? 0)).toFixed(2)
                      ),
                      details: {
                        shares: item.cantidad ?? 0,
                        price: item.precio ?? 0,
                      },
                    })
                  );
                }

                this.distributionAssets();
              })
              .catch((error) => {
                console.error('Error al obtener datos:', error);
              });
          }
        });
      }
    });
  }

  distributionAssets() {
    const total = this.availableStock + this.totalInvested;
    const stockPercentage = parseFloat(
      ((this.totalInvested / total) * 100).toFixed(2)
    );
    const cashPercentage = parseFloat(
      ((this.availableStock / total) * 100).toFixed(2)
    );

    // Asignar colores basados en el porcentaje
    this.assetDistribution = [
      {
        name: 'Acciones',
        percentage: stockPercentage,
        color: this.getGradientColor(stockPercentage),
      },
      {
        name: 'Efectivo',
        percentage: cashPercentage,
        color: this.getGradientColor(cashPercentage),
      },
    ];
  }

  getGradientColor(percentage: number): string {
    if (percentage >= 75) return 'bg-primary-800';
    if (percentage >= 50) return 'bg-primary-600';
    if (percentage >= 25) return 'bg-primary-400';
    return 'bg-primary-200';
  }

  get filteredTransactions(): Transaction[] {
    return this.allTransactions.filter((transaction) => {
      const matchesSearch =
        !this.searchQuery ||
        transaction.ticker
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }

  get recentTransactions(): Transaction[] {
    return this.allTransactions.slice(-2);
  }

  toggleTransactionsModal() {
    this.showTransactionsModal = !this.showTransactionsModal;
    if (!this.showTransactionsModal) {
      this.expandedTransactionId = null;
      this.resetFilters();
    }
  }

  closeModal(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.toggleTransactionsModal();
    }
  }

  toggleTransactionDetails(transactionId: string) {
    this.expandedTransactionId =
      this.expandedTransactionId === transactionId ? null : transactionId;
  }

  resetFilters() {
    this.dateFilter = '';
    this.searchQuery = '';
  }
}
