<template>
  <div class="container">
    <h2>
      Cadastro de Filmes
      <router-link to="/cadfilmes" class="btn btn-danger float-right ml-3">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
      <form class="form-inline float-right">
        <input
          class="form-control form-control mr-1"
          type="text"
          v-model="filtro"
          @keyup="pesquisar"
          placeholder="Pesquisa"
        />
        <button class="btn btn-success" @click.prevent="listar">Todos</button>
      </form>
    </h2>
    <div class="row mt-5">
      <div class="col-sm-3">
        <img src="logo.png" alt="Logo netflix" style="max-width: 100%" />
      </div>
      <div class="col-sm-9">
        <h2 class="text-center">Lista de Filmes</h2>
        <table class="table table-hover">
          <tr>
            <th>Foto</th>
            <th>Filme</th>
            <th>Gênero</th>
            <th>Duração Min</th>
            <th>Diretor</th>
            <th>Destaque</th>
            <th>Alterar/Excluir</th>
          </tr>
          <tr v-for="filme in filmes" :key="filme.id">
            <td><img :src="filme.foto" alt="Foto do filme" /></td>
            <td>{{ filme.nome }}</td>
            <td>{{ filme.genero }}</td>
            <td>{{ filme.duracao }}</td>
            <td>{{ filme.diretor }}</td>
            <td class="text-center text-danger font-weight-bold">
              {{ filme.destaque | destacafilme }}
            </td>
            <td>
              <button
                class="btn btn-sm btn-info mx-1"
                title="Destacar"
                @click="destacar(filme.id)"
              >
                <i class="far fa-star"></i>
              </button>
              <button
                class="btn btn-warning btn-sm mx-1"
                title="Alterar"
                @click="editar(filme.id)"
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                class="btn btn-danger btn-sm mx-1"
                title="Excluir"
                @click="excluir(filme.id, filme.nome)"
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
      filme: {
        id: null,
        nome: null,
        genero: null,
        duracao: null,
        diretor: null,
        foto: null,
      },
      filtro: "",
      filmes: [],
    };
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/filmes")
        .then((response) => (this.filmes = response.data));
      this.filtro = "";
    },

    editar(id) {
      
      axios.get(this.$urlAPI + "/filme/" + id).then((response) => {
        this.filme = response.data;
        console.log(this.filme);
        this.$router.push({
          path: "/cadfilmes",
          query: { altera: this.filme },
        });
      });
       
    },

    destacar(id) {
        
      axios.put(this.$urlAPI + "/destaques/" + id).then((response) => {
        if (response.status == 200) {
          this.listar();
        }        
      });
     
    },

    excluir(id, nome) {
     
      if (confirm(`Confirma exclusão do Filme '${nome}'?`)) {
        axios.delete(this.$urlAPI + "/delete/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Ok! Filme '${nome}' excluído com sucesso!`);
            this.listar();
          }
        });
      }
       
    },

    pesquisar() {
      if (this.filtro.length == 0) {
        this.listar();
      } else {
        axios
          .get(this.$urlAPI + "/pesq/" + this.filtro)
          .then((response) => (this.filmes = response.data));
      }
    },
  },
  filters: {
    destacafilme(value) {
      return value ? "x" : "";
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