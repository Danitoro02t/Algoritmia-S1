const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

async function main() {
  const terminal = readline.createInterface({ input: stdin, output: stdout });
  const respuestas = terminal[Symbol.asyncIterator]();

  try {
    const nombre = await preguntar(respuestas, "¿Cómo te llamas? ");
    console.log(`Hola, ${nombre}, bienvenido a Algoritmia`);
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
