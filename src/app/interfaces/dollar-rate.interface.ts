export interface DollarRate {
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: Date;
  variacion?: number;
}