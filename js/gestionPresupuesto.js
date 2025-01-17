// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
function actualizarPresupuesto(valorIntroducido) {
    // TODO
    let aux = "";
    if(valorIntroducido >= 0)
    {
        presupuesto = valorIntroducido;
        return presupuesto;

    }else 
    {
        console.log("Error, se ha introducido un valor negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
        let mostrarPres ="Tu presupuesto actual es de " + presupuesto + " €";
        return mostrarPres;
    }

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.etiquetas = [...etiquetas];
    this.fecha = (typeof fecha === 'string') ?  Date.parse(fecha) : fecha;
    //forma diferente de hace el método de la línea anterior (forma más larga)//
    /*if (typeof fecha === 'string')
    {
        this.fecha = Date.parse(fecha);
        
    }else
    {
        this.fecha = fecha;
    }*/
    this.descripcion = descripcion;
    if (valor <0 || typeof valor!=='number') {
        this.valor = 0;
    }else 
    {
        this.valor = valor;
    }
    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    this.actualizarDescripcion = function (descrip)
    {
        this.descripcion=descrip;
    },
    this.actualizarValor = function(valoActualizar) 
    {
        if (valoActualizar >= 0) 
        {
            this.valor = valoActualizar;
        }
    },
    this.mostrarGastoCompleto = function() 
    {
        let auxF = new Date(this.fecha);
        // if (typeof this.fecha === "string")
        // {
        //     auxF = Date.parse(this.fecha);
        // }else 
        // {
        //     auxF = this.fecha;
        // }
        /*let auxFecha = new Date(auxF);*/
        
        let strigEtiquetas = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(auxF.toLocaleString())}\nEtiquetas:\n`;
        for(let etiqueta of this.etiquetas) 
        {
            strigEtiquetas += `- ${etiqueta}\n`;
        };
        return strigEtiquetas;
    },
    this.actualizarFecha = function(stringFecha)
    {
		let aux=Date.parse(stringFecha);
		if (!isNaN(aux)) //(type of aux === 'number') //isNaN (not a number)
        {
			this.fecha=aux;
        }
	},
    this.anyadirEtiquetas = function(...etiquets)
    {      
        let nuevoArray = [...this.etiquetas, ...etiquets]
        let aux = new Set (nuevoArray);
        let ar = Array.from(aux);
        this.etiquetas = ar;         
    },
    this.borrarEtiquetas = function(...etiquets)
    {   
        for (let i = 0; i < etiquets.length; i++)
        {
            for (let j = 0; j < this.etiquetas.length; j++)
            {
                if (etiquets[i] === this.etiquetas[j])
                {
                   this.etiquetas.splice(j, 1);      
                }
            }
        }
    },
    this.obtenerPeriodoAgrupacion = function (periodo)
    {
        let fech = new Date(this.fecha);
        let dia = `${fech.getDate()}`;
        let mes = `${(fech.getMonth() + 1)}`;
        let anyo = `${fech.getFullYear()}`;
        if (mes > 0 &&  mes  <= 9)
        {
            mes = `0${mes}`
        }
        if (dia > 0 && dia < 9 )
        {
            dia = `0${dia}`
        }
        let aux = `${anyo}-${mes}-${dia}`;
        if (periodo === "dia")
        {
            aux = aux;

        }else if (periodo === "mes")
        {
            aux = `${anyo}-${mes}`

        }else if (periodo === "anyo")
        {
            aux = `${anyo}`;
        }
        return aux;
    }
} 
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    gastos.push(gasto);
    idGasto++;
}
function borrarGasto(id){
    let aux = gastos.findIndex(gasto => gasto.id == id); //guardo la posicion en la que esta el objeto con dicho id//
    if(aux !== -1) //si devuelve -1 es que el objeto no existe entonces no se haria nada//
    {
        gastos.splice(aux, 1);//si el aux no es -1 entonces se borra el gasto desado de gastos//
    }
}
function calcularTotalGastos(){
    let total = 0; 
    gastos.forEach((x) => {
        total += x.valor;
    })
    return total;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
/* item (cada gasto) --explicacion profesor-- idex (posicion)*/
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let filGastos = gastos.filter(function(gasto)
    {
        let existe = true;
        if (fechaDesde)
        {
            if(gasto.fecha < Date.parse(fechaDesde)) existe = false;
        }
        if (fechaHasta)
        {
            if(gasto.fecha > Date.parse(fechaHasta)) existe = false;
            
        }
        if (valorMinimo)
        {
            if(gasto.valor < valorMinimo) existe = false;
        }
        if (valorMaximo)
        {
            if(gasto.valor > valorMaximo) existe = false;
        }
        if (descripcionContiene)
        {
            if(!gasto.descripcion.includes(descripcionContiene)) existe = false;
        }       
        if(etiquetasTiene)
        {
            let tiene = false;                   
                for (let i = 0; i < gasto.etiquetas.length; i++) 
                {                   
                    for (let j= 0; j < etiquetasTiene.length; j++) 
                    {
                        if(gasto.etiquetas[i] == etiquetasTiene[j]) tiene = true;                  
                    }
                }
            if(tiene == false) existe = false;
        }
        return existe; 
    })
    return filGastos;
}
/*=> function*/
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta){
   let filtrargast = filtrarGastos({etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta});
    let respuesta = filtrargast.reduce((acomulador, item) => {
        let aux = item.obtenerPeriodoAgrupacion (periodo);
                if (!acomulador[aux]) //si no esxiste ese periodo se inicializa con el valor//
                {
                    acomulador[aux] = item.valor;
                }else
                {
                    acomulador[aux] += item.valor; //si existe se va añadiendo el valor//
                }
                return acomulador ;
            }, {});
  return respuesta;
}
function transformarListadoEtiquetas(etiquetas)
{
    let resultado = etiquetas.match(/[a-z0-9]+/gi);
    return resultado;
}
function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado);
    }
}
    
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos, 
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos,
    CrearGasto
 
}
