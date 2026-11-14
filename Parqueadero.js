const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

function calcularValor(tipo, minutos, factura) {
  const tarifas = {
    1: 4000,
    2: 2000,
  };
  const tarifa = tarifas[tipo];

  if (minutos < 0) {
    return { error: "Los minutos no pueden ser negativos" };
  }

  if (tarifa === undefined) {
    return { error: "Tipo de vehículo no válido" };
  }

  if (minutos <= 15) {
    return { valor: 0 };
  }

  const horas = Math.ceil((minutos - 15) / 60);
  let valor = Math.min(horas * tarifa, 30000);

  if (factura.trim().toUpperCase() === "S") {
    valor /= 2;
  }

  return { valor };
}

async function main() {
  const terminal = readline.createInterface({ input: stdin, output: stdout });
  const respuestas = terminal[Symbol.asyncIterator]();

  try {
    const tipoTexto = await preguntar(
      respuestas,
      "Tipo de vehículo (1 = carro, 2 = moto): ",
    );
    const minutosTexto = await preguntar(respuestas, "Minutos de permanencia: ");
    const factura = await preguntar(respuestas, "¿Tiene factura de compra? (S/N): ");
    const tipo = Number(tipoTexto);
    const minutos = Number(minutosTexto);

    if (
      tipoTexto.trim() === "" ||
      minutosTexto.trim() === "" ||
      !Number.isInteger(tipo) ||
      !Number.isInteger(minutos)
    ) {
      console.log("El tipo de vehículo y los minutos deben ser números enteros");
      return;
    }

    const resultado = calcularValor(tipo, minutos, factura);

    if (resultado.error) {
      console.log(resultado.error);
      return;
    }

    console.log(`Valor a pagar: $${resultado.valor}`);
  } finally {
    terminal.close();
  }
}

async function preguntar(respuestas, mensaje) {
  stdout.write(mensaje);
  const respuesta = await respuestas.next();
  return respuesta.done ? "" : respuesta.value;
}

if (require.main === module) {
  main();
}

module.exports = { calcularValor };
