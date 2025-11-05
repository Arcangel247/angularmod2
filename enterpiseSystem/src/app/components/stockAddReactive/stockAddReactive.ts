import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal } from '@angular/core';
// Importamos 'Signal' del núcleo de Angular (Angular Core)
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf

// Interfaz para la lista de stock que ahora recibimos (ajustada a tu estructura de datos)
interface StockItem {
  id: number;
  name: string;
  cuantity: number;
}


@Component({
  // Selector actualizado
  selector: 'stock-add-reactive',
  // Importaciones: Añadimos ReactiveFormsModule y CommonModule
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  // Asumiendo que el HTML se llama stockAddReactive.html
  templateUrl: './stockAddReactive.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockAddReactive {

  // 1. Recibimos el Formulario Reactivo (FormGroup) del componente padre
  @Input() parentForm!: FormGroup;

  // 2. Recibimos la lista de stock (Signal) del componente padre para mostrar la tabla
  // Ahora la palabra 'Signal' está reconocida.
  @Input() stockList!: Signal<StockItem[]>;

  // 3. Modificamos el 'output'
  @Output() OnNewStock = new EventEmitter<void>();

  stockAddTitle = 'Agregar stock (Reactivo)';

  onSubmit() {
    this.OnNewStock.emit();
  }
}
