# Algoritmia-S1

## Algoritmo de parqueadero

El programa [Parqueadero.js](./Parqueadero.js) calcula cuánto debe pagar un
vehículo según su tipo y el tiempo de permanencia.

### Cómo ejecutarlo

Se necesita tener Node.js instalado. Desde la carpeta del proyecto, ejecuta:

```bash
node Parqueadero.js
```

El programa solicita el tipo de vehículo (1 para carro o 2 para moto), los
minutos de permanencia y si se tiene factura de compra (S/N).

### Reglas de cobro

- Los primeros 15 minutos son gratis.
- Después de los 15 minutos, cada hora iniciada cuesta $4.000 para un carro y
  $2.000 para una moto. Por ejemplo, 16 minutos se cobran como una hora.
- El cobro tiene un máximo de $30.000.
- Si se presenta factura de compra, se aplica un descuento del 50% al valor
  calculado.
- El programa informa si los minutos son negativos o si el tipo de vehículo no
  es válido.
