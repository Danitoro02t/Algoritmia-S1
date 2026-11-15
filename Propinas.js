const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

function calcularPropina(cuenta, porcentaje, personas) {
  const propina = (cuenta * porcentaje) / 100;
  const total = cuenta + propina;
  const cadaUno = total / personas;

  return { propina, total, cadaUno };
}

async function main() {
  const terminal = readline.createInterface({ input: stdin, output: stdout });
  const respuestas = terminal[Symbol.asyncIterator]();

  try {
    const cuentaTexto = await preguntar(respuestas, "Cuenta: ");
    const porcentajeTexto = await preguntar(respuestas, "% de propina: ");
    const personasTexto = await preguntar(respuestas, "Personas: ");

    const cuenta = Number(cuentaTexto);
    const porcentaje = Number(porcentajeTexto);
    const personas = Number(personasTexto);

    if (!Number.isFinite(cuenta) || !Number.isFinite(porcentaje) || !Number.isFinite(personas)) {
      console.log("Los valores deben ser números válidos");
      return;
    }

    if (personas <= 0) {
      console.log("La cantidad de personas debe ser mayor que 0");
      return;
    }

    const resultado = calcularPropina(cuenta, porcentaje, personas);

    console.log(`Propina: $${resultado.propina.toFixed(3)}`);
    console.log(`Total: $${resultado.total.toFixed(3)}`);
    console.log(`Cada uno paga: $${resultado.cadaUno.toFixed(3)}`);
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

module.exports = { calcularPropina };
