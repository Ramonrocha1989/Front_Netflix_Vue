import Vue from 'vue'
import VueRouter from 'vue-router'

import Logado from './components/Logado'
import Cadastro_filmes from './components/Cadastro_filmes'
import Listagem from './components/Listagem_filmes'
import Formlogin from './components/Formlogin'
import Listacomentarios from './components/ListaComentarios'
import FormComentarios from './components/FormComentario'
import Graficofilmes from './components/Graficofilmes'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Logado },
    { path: '/cadfilmes', component: Cadastro_filmes },
    { path: '/formfilmes', component: Listagem },
    { path: '/formlogin', component: Formlogin },
    { path: '/listacoment', component: Listacomentarios },
    { path: '/formcoment', component: FormComentarios },
    { path: '/graficofilmes', component: Graficofilmes }
   
  ]

  export default new VueRouter({   
    mode: 'history', 
    routes 
  })