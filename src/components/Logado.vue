<template>
  <div class="container">
    <div class="row" >
      <div
        class="card col-sm-3 m-2" style="width:100px"
        v-for="filme in filmes"
        :key="filme.id"       
      >
       <img class="card-img-top mt-3" :src="filme.foto" alt="Foto do filme"  /> 
        <div class="card-body"  >
          <h4 class="card-title">{{ filme.nome }}</h4>
          <p class="card-text">{{ filme.duracao }} Min</p>
          <p class="card-text">{{ filme.diretor }}</p>
          <button
          
            class="btn btn-dark btn-sm mx-1"
            title="Alterar"
            @click="editar(filme.id)"
          >
            Deixar comentario
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filme: {
        nome: null,
        genero: null,
        duracao: null,
        diretor: null,
        foto: null,
      },
      comentario: {
        usuario:null,
        comentario: null,
        filme_id: null,
      },
      filtro: "",
      filmes: [],
      comentarios: [],
    };
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/destaques")
        .then((response) => (this.filmes = response.data));
      this.filtro = "";
    },

    

    editar(id) {
      axios.get(this.$urlAPI + "/filme/"+ id).then((response) => {
        this.filme = response.data;
        console.log(this.filme);
        this.$router.push({
          path: "/formcoment",
          query: { altera: this.filme },
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
