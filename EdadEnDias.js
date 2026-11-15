const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

function calcularDias(edad) {
  return edad * 365;
}

async function main() {
  const terminal = readline.createInterface({ input: stdin, output: stdout });
  const respuestas = terminal[Symbol.asyncIterator]();

  try {
    const edadTexto = await preguntar(respuestas, "¿Cuántos años tienes? ");
    const edad = Number(edadTexto);

    if (!Number.isFinite(edad) || edad < 0) {
      console.log("La edad debe ser un número válido y no negativa");
      return;
    }

    const dias = calcularDias(edad);
    console.log(`Has vivido ${dias} días`);
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

module.exports = { calcularDias };
