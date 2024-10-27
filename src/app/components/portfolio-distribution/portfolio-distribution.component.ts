import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Asset {
  name: string;
  percentage: number;
  shade: string;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  description: string;
  time: string;
  date: Date;
  amount: number;
  details: {
    shares: number;
    price: number;
    fees: number;
    status: 'completed' | 'pending' | 'cancelled';
  };
}

@Component({
  selector: 'app-portfolio-distribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-distribution.component.html',
  styleUrls: ['./portfolio-distribution.component.scss']
})
export class PortfolioDistributionComponent {
  showTransactionsModal = false;
  expandedTransactionId: string | null = null;
  dateFilter: string = '';
  searchQuery: string = '';

  assetDistribution: Asset[] = [
    { name: 'Acciones', percentage: 45, shade: '600' },
    { name: 'Bonos', percentage: 30, shade: '400' },
    { name: 'Efectivo', percentage: 25, shade: '300' }
  ];

  allTransactions: Transaction[] = [
    {
      id: '1',
      type: 'buy',
      description: 'Compra AAPL',
      time: 'Hace 2 horas',
      date: new Date(2024, 1, 15),
      amount: 5240.00,
      details: {
        shares: 25,
        price: 209.60,
        fees: 10.00,
        status: 'completed'
      }
    },
    {
      id: '2',
      type: 'sell',
      description: 'Venta TSLA',
      time: 'Hace 5 horas',
      date: new Date(2024, 1, 15),
      amount: 3120.00,
      details: {
        shares: 12,
        price: 260.00,
        fees: 10.00,
        status: 'completed'
      }
    },
    {
      id: '3',
      type: 'buy',
      description: 'Compra MSFT',
      time: 'Hace 1 día',
      date: new Date(2024, 1, 14),
      amount: 2850.00,
      details: {
        shares: 8,
        price: 356.25,
        fees: 10.00,
        status: 'completed'
      }
    },
    {
      id: '4',
      type: 'buy',
      description: 'Compra GOOGL',
      time: 'Hace 2 días',
      date: new Date(2024, 1, 13),
      amount: 4320.00,
      details: {
        shares: 30,
        price: 144.00,
        fees: 10.00,
        status: 'completed'
      }
    }
  ];

  get filteredTransactions(): Transaction[] {
    return this.allTransactions.filter(transaction => {
      const matchesDate = !this.dateFilter || 
        transaction.date.toISOString().split('T')[0] === this.dateFilter;
      
      const matchesSearch = !this.searchQuery || 
        transaction.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesDate && matchesSearch;
    });
  }

  get recentTransactions(): Transaction[] {
    return this.allTransactions.slice(0, 2);
  }

  toggleTransactionsModal() {
    this.showTransactionsModal = !this.showTransactionsModal;
    if (!this.showTransactionsModal) {
      this.expandedTransactionId = null;
      this.resetFilters();
    }
  }

  toggleTransactionDetails(transactionId: string) {
    this.expandedTransactionId = this.expandedTransactionId === transactionId ? null : transactionId;
  }

  resetFilters() {
    this.dateFilter = '';
    this.searchQuery = '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}