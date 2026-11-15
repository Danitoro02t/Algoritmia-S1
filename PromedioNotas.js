const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

function calcularPromedio(nota1, nota2, nota3) {
  return (nota1 + nota2 + nota3) / 3;
}

async function main() {
  const terminal = readline.createInterface({ input: stdin, output: stdout });
  const respuestas = terminal[Symbol.asyncIterator]();

  try {
    const nota1 = Number(await preguntar(respuestas, "Nota 1: "));
    const nota2 = Number(await preguntar(respuestas, "Nota 2: "));
    const nota3 = Number(await preguntar(respuestas, "Nota 3: "));

    if (
      !Number.isFinite(nota1) ||
      !Number.isFinite(nota2) ||
      !Number.isFinite(nota3)
    ) {
      console.log("Las notas deben ser números válidos");
      return;
    }

    if (nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5 || nota3 < 0 || nota3 > 5) {
      console.log("Las notas deben estar entre 0 y 5");
      return;
    }

    const promedio = calcularPromedio(nota1, nota2, nota3);
    console.log(`El promedio es: ${promedio.toFixed(2)}`);
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

module.exports = { calcularPromedio };
