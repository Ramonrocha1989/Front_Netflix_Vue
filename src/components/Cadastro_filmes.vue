<template>
  <div class="container">
    <h2>
      <span v-if="filme.id">Alteração de Filme</span>
      <span v-else>Inclusão de Filmes</span>


      <a class="btn btn-danger float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>
    <div class="row mt-5">
      <div class="col-sm-3">
        <img src="logo.png" alt="Logo netflix" style="max-width: 100%" />
      </div>
      <div class="col-sm-9">
        <form action="/action_page.php" @submit.prevent="salvar">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="filme">Nome do filme:</label>
                <input
                  v-model="filme.nome"
                  type="text"
                  class="form-control form-control"
                  placeholder="Nome do filme"
                  name="filme"
                  id="filme"
                  ref="nome"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="duracao">Duração do filme Min:</label>
            <input
              v-model="filme.duracao"
              type="number"
              class="form-control form-control"
              placeholder="Ex: 120"
              name="duracao"
              id="duracao"
              required
            />
          </div>
          <div class="form-group">
            <label for="foto">Foto</label>
            <input
              v-model="filme.foto"
              type="text"
              class="form-control"
              placeholder="Foto do arquivo"
              name="foto"
              id="foto"
              required
            />
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label for="genero">Gênero:</label>
                <select
                  id="genero"
                  class="form-control"
                  v-model="filme.genero_id"
                  required
                >
                  <option
                    v-for="genero in generos"
                    :key="genero.id"
                    :value="genero.id"
                  >
                    {{ genero.genero }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="diretor">Diretor:</label>
                <select
                  id="diretor"
                  class="form-control"
                  v-model="filme.diretores_id"
                  required
                >
                  <option
                    v-for="diretor in diretores"
                    :key="diretor.id"
                    :value="diretor.id"
                  >
                    {{ diretor.nomediretor }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-success px-4 mr-2">
            <i class="far fa-save"></i> Salvar
          </button>
          <button type="reset" class="btn btn-danger px-4">
            <i class="far fa-window-restore"></i> Limpar
          </button>
        </form>
        <div class="alert"></div>
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
      generos: null,
      diretores: null,
    };
  },
  methods: {

    inclui() {
      if(localStorage.getItem("token")){
      axios
        .post(this.$urlAPI + "/filmes", this.filme, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Filme Cadastro com código ${response.data.id}`)
        );
      this.filme = {}; 
      this.$refs.nome.focus();
      } else{
        alert('Erro... Faça login para realizar inclusão')
      }
    },

    salvar() {
      
      if (this.filme.id) {
        this.altera();
      } else {
        this.inclui();
      }
    },

    altera() {
      if(localStorage.getItem("token")){
      axios
        .put(this.$urlAPI + "/filmes/" + this.filme.id, this.filme, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Filme Alterado Corretamente ${response.data}`)
        );
        this.$router.push({
          path: "/formfilmes",
          query: { altera: this.filme },
        });
        } else{
        alert('Erro... Faça login para realizar inclusão')
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },

  mounted() {
    axios.get(this.$urlAPI + "/generos").then((response) => {
      this.generos = response.data;
    });

    axios.get(this.$urlAPI + "/diretores").then((response) => {
      this.diretores = response.data;
    });

    if (this.$route.query.altera) {
      //      console.log(this.$route.query.altera)
      this.filme = this.$route.query.altera;
    }
  },
};
</script>

<style scoped>
</style>