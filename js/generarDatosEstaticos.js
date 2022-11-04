import * as exGp from './gestionPresupuesto.js';
import * as exGpweb from './gestionPresupuestoWeb.js';
exGp.actualizarPresupuesto(1500);
exGpweb.mostrarDatoEnId(exGp.mostrarPresupuesto(),"presupuesto");
let gast1 = new exGp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gast2= new exGp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gast3 = new exGp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gast4 = new exGp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gast5 = new exGp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gast6 = new exGp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
exGp.anyadirGasto(gast1);
exGp.anyadirGasto(gast2);
exGp.anyadirGasto(gast3);
exGp.anyadirGasto(gast4);
exGp.anyadirGasto(gast5);
exGp.anyadirGasto(gast6);
exGpweb.mostrarDatoEnId(exGp.calcularTotalGastos(),"gastos-totales");
exGpweb.mostrarDatoEnId(exGp.calcularBalance(),"balance-total");

