<template>
    <div class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
            <img :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" alt="Imagen cripto">
            <div>
                <p>
                    El precio es de:
                    <span>{{ cotizacion.PRICE }}</span>
                </p>
                <p>
                    Precio más alto del día:
                    <span>{{ cotizacion.HIGHDAY }}</span>
                </p>
                <p>
                    Precio más bajo del día:
                    <span>{{ cotizacion.LOWDAY }}</span>
                </p>
                <p>
                    Variación últimas 24 hrs:
                    <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span>
                </p>
                <p>
                    Última actualización:
                    <span>{{ cotizacion.LASTUPDATE }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
// Para componentizar y usar un composable solo se carga la variable en el 
// padre y se pasa via props al hijo
defineProps({
    cotizacion: {
        type: Object,
        required: true
    }
})
</script>