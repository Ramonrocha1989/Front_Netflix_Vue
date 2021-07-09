<template>
  <div class="container">
    <h2>
       <a class="btn btn-danger float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a
      >
      <span>Cadastrar comentario</span>
    </h2>
    <div class="row mt-5">
      <div class="col-sm-3">
        <img src="logo.png" alt="Logo netflix" style="max-width: 100%" />
      </div>
      <div class="col-sm-9">
        <form action="/action_page.php" @submit.prevent="inclui">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="comentario">Usuario:</label>
                <input
                  v-model="comentario.usuario"
                  type="text"
                  class="form-control form-control"
                  placeholder="Seu nome"
                  name="filme"
                  id="filme"
                  ref="nome"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="comentario">Comentario:</label>
            <textarea
              v-model="comentario.comentario"
              type="text"
              class="form-control form-control"
              placeholder="Ex: Ótimo filme"
              name="duracao"
              id="duracao"
              required
            />
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
      comentario: {
        id: null,
        usuario: null,
        comentario: null,
        filmes_id: null,
      },
    };
  },

  methods: {
    inclui() {
      console.log(this.comentario);

      axios
        .post(this.$urlAPI + "/cadcomentario", this.comentario)
        
          alert(`Obrigado!!! comentário cadastrado com sucesso`)
          this.$router.push({
          path: "/",
          query: { altera: this.filme },
        });
        
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  mounted() {
    if (this.$route.query.altera) {
      //      console.log(this.$route.query.altera)
      this.filme = this.$route.query.altera;
      this.comentario.filmes_id = this.filme.id;
    }
  },
};
</script>

<style scoped>
</style>