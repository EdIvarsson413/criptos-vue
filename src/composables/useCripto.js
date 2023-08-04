// Un composable es una función que engloba todo un grupo de funciones o variables
// Ayuda a mantener limpieza del codigo y ayudar en la parte reactiva

import { computed, onMounted, ref } from "vue"

export default function useCripto() {
    // Logica del composable

    const cotizacion = ref({});
    const cargando = ref(false);

    // State de monedas para convertir
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ])

    // Cargar criptomonedas
    const criptos = ref([]);

    // Tan pronto inicie la app, se cargaran las criptomonedas desde la api
    onMounted(() => {
        fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=7&tsym=USD`)
        .then( respuesta => respuesta.json())
        .then( ( { Data } ) => { criptos.value = Data })
    })

    const obtenerCotizacion = async ( cotizar ) => {
        // Se carga el spinner
        cargando.value = true;

        // Se contruye la URL
        const { moneda, cripto } = cotizar;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`

        try {
          // Se realiza la consulta a la api
            const respuesta = await fetch( url );
            const data = await respuesta.json();

          // Los [] son una alternativa de iterar en un objeto que contenda llaves dinamicas 
            cotizacion.value = data.DISPLAY[cripto][moneda];
        } catch (error) {
            console.log(error)
        }
        finally {
          // Se detiene el spinner
            cargando.value = false;
        }
    }

    const mostrarResultado = computed(() => {
        // Para ver si un objeto tiene contenido es con object.keys o values
        return Object.values( cotizacion.value ).length 
    })
    return {
        monedas,
        criptos,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }
}