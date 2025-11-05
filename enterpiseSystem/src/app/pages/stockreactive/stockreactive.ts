import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para directivas
import { StockAddReactive } from "../../components/stockAddReactive/stockAddReactive"; // Componente Hijo
import { StockService } from '../../services/stockService';

@Component({
  // Asegúrate de que el selector y la URL del HTML sean correctos para tu proyecto
  selector: 'app-stock-reactive',
  imports: [StockAddReactive, ReactiveFormsModule, CommonModule],
  templateUrl: './StockReactive.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true // Asumiendo que es standalone
})
export default class StockReactive implements OnInit {

  // 1. Inyección de dependencias (servicios)
  public stockService = inject(StockService);
  private fb = inject(FormBuilder);

  // 2. Declaración del Formulario Reactivo
  public stockForm: FormGroup;

  // 3. Creación del Formulario (se ejecuta al inicio del componente)
  constructor() {
    this.stockForm = this.fb.group({
      // Definimos los campos (Controles) y sus Validadores
      // Los nombres 'product', 'cuantity', 'existance' deben coincidir con el HTML del hijo.
      product: ['', [Validators.required, Validators.minLength(5)]],
      cuantity: [0, [Validators.required, Validators.min(1)]],
      existance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    console.log("El componente principal de Stock está listo.");
  }

  // 4. Lógica de Envío de Datos (Se llama cuando el hijo presiona el botón)
  public onStockSubmit() {
    if (this.stockForm.valid) {

      const newStockItem = {
        id: Math.floor(Math.random() * 100), // Generación simple de ID
        ...this.stockForm.value // Obtenemos el objeto con todos los valores
      };

      console.log('Datos de Stock a enviar:', newStockItem);
      // Llama a la lógica de guardado en el servicio
      // this.stockService.addStock(newStockItem);

      // Resetea el formulario para limpiar los campos
      this.stockForm.reset({ cuantity: 0, existance: 0 });
    } else {
      // Muestra los errores al tocar todos los campos inválidos
      console.error('El formulario es inválido. Por favor, revise los campos.');
      this.stockForm.markAllAsTouched();
    }
  }
}




