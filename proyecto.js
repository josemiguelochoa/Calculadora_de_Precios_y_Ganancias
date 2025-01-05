// Función para calcular el precio final del producto
function calcularPrecioFinal(costoMateriaPrima, margenGanancia, impuestos) {
    const precioSinImpuestos = costoMateriaPrima / (1 - margenGanancia/100);
    const precioFinal = precioSinImpuestos * (1 + impuestos/100);
    return {precioFinal, precioSinImpuestos};
}

// Función para calcular la ganancia total esperada
function calcularGananciaEsperada(precioFinal, precioSinImpuestos, costoMateriaPrima, cantidadVentas) {
    const gananciaUnitaria = precioFinal - costoMateriaPrima;
    const margenGananciaReal = ((precioSinImpuestos - costoMateriaPrima) / precioFinal) * 100;
    return {
        gananciaTotal: gananciaUnitaria * cantidadVentas,
        margenGananciaReal: margenGananciaReal
    };
}

// Función principal que maneja la interacción con el usuario
function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Preguntar datos del producto
    readline.question('Ingrese el costo de la materia prima: ', (costoMP) => {
        readline.question('Ingrese el margen de ganancia deseado (%): ', (margen) => {
            readline.question('Ingrese el porcentaje de impuestos (%): ', (impuestos) => {
                // Calcular precio final
                const {precioFinal, precioSinImpuestos} = calcularPrecioFinal(
                    parseFloat(costoMP),
                    parseFloat(margen),
                    parseFloat(impuestos)
                );

                console.log(`\nPrecio final sugerido: $${precioFinal.toFixed(2)}`);

                // Preguntar por ventas esperadas
                readline.question('\n¿Cuántas ventas espera realizar? ', (ventas) => {
                    const {gananciaTotal, margenGananciaReal} = calcularGananciaEsperada(
                        precioFinal,
                        precioSinImpuestos,
                        parseFloat(costoMP),
                        parseInt(ventas)
                    );

                    console.log(`\nGanancia total esperada: $${gananciaTotal.toFixed(2)}`);
                    console.log(`\nMargen de ganancia real: ${margenGananciaReal.toFixed(2)}%`);
                    readline.close();
                });
            });
        });
    });
}

// Iniciar la aplicación
main();
