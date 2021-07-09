<template>
 <div class="container">
   
   <h2>Gráfico Relacionando Nº de Filmes por Gênero</h2>
     <GChart
       type="PieChart"
       :data="filmesGenero"
    />
 </div>   
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from 'axios'
 
export default {
  components: {
    GChart
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      filmesGenero: [["Genero", "Nº Filmes"]],
    }
  }, 
  mounted() {
    axios.get(this.$urlAPI + "/generosgrafico")
         .then(response => {
           const genero = response.data;
//           console.log(marcas)
           genero.forEach(genero => {
             this.filmesGenero.push([genero.genero, genero.num])             
           });
         })
  }
}
</script>

<style scoped>
</style>
