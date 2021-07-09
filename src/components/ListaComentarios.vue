<template>
  <div class="container">
    
    <div class="row mt-5">
      <div class="col-sm-3">
        <img src="logo.png" alt="Logo netflix" style="max-width: 100%" />
      </div>
      <div class="col-sm-9">
        <h2 class="text-center">Lista de Comentarios</h2>
        <table class="table table-hover">
          <tr>
            <th>Usuario</th>
            <th>Comentario</th>
            <th>Filme</th>
              <th>Excluir</th>
          </tr>
          <tr v-for="comentario in comentarios" :key="comentario.id">
            <td>{{ comentario.usuario }}</td>
            <td>{{ comentario.comentario }}</td>
            <td>{{ comentario.nome}}</td>


            <td>             
             
              <button
                class="btn btn-danger btn-sm mx-1"
                title="Excluir"
                @click="excluir(comentario.id, comentario.usuario)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      comentario: {
        id: null,
        usuario: null,
        comentario: null,
        nome: null,
      },
      filtro: "",
      comentarios: [],
    };
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/comentarios")
        .then((response) => (this.comentarios = response.data));
      console.log(this.comentarios);
      this.filtro = "";
    },
     excluir(id, usuario) {
     
      if (confirm(`Confirma exclusão do Comentario feito por '${usuario}'?`)) {
        axios.delete(this.$urlAPI + "/delcomentarios/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Ok! Comentario excluído com sucesso!`);
            this.listar();
          }
        });
      }
       
    },
    
  },
};
</script>

<style scoped>
table img {
  widows: 100px;
  height: 60px;
}
</style>