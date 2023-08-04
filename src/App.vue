<template>
  <div class="contenedor">
    <h1 class="titulo">
      Cotizador de <span>Criptomonedas</span>
    </h1>

    <div class="contenido">
      <!-- Mensaje de error -->
      <Alerta v-if="error">
        {{ error }}
      </Alerta>

      <!-- Formulario para realizar la cotizacion -->
      <form class="formulario" @submit.prevent="cotizarCripto">
        <!-- Moneda de cambio -->
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">-- Seleccionar --</option>
            
            <!-- Agregando monedas de ejemplo -->
            <option 
              v-for="(moneda, index) in monedas" 
              :key="index"
              :value="moneda.codigo"
            >
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        
        <!-- Criptomoneda -->
        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select id="cripto" v-model="cotizar.cripto">
            <option value="">-- Seleccionar --</option>
            
            <!-- Agregando monedas de ejemplo -->
            <option 
              v-for="(cripto, index) in criptos" 
              :key="index"
              :value="cripto.CoinInfo.Name"
            >
              {{ cripto.CoinInfo.FullName }}
            </option>
          </select>
        </div>

        <!-- Cotizar -->
        <input type="submit" value="Cotizar"/>
      </form>

      <!-- Spinner de cargando -->
      <Spinner v-if="cargando"/>

      <!-- Resultados de la consulta -->
      <Cotizacion v-if="mostrarResultado" :cotizacion="cotizacion" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue'
import Cotizacion from './components/Cotizacion.vue'
import useCripto from './composables/useCripto'

// Usando un composable
const { monedas, criptos, cargando, cotizacion, obtenerCotizacion, mostrarResultado } = useCripto();

// En este state se guardan los valores seleccionados y para un mensaje de error
const error = ref('');
const cotizar = reactive({
  moneda: '',
  cripto: ''
})

const cotizarCripto = () => {
  // Validar que el state de cotizar este lleno
  if( Object.values( cotizar ).includes('') ) {
    error.value = 'Todos los campos son requeridos'
    return
  }
  
  // Elimina el error ya se mostro y se realiza la consulta
  error.value = '';  
  obtenerCotizacion( cotizar );
}
</script>