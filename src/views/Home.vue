<template>
  <div class="page">
    <div class="block has-background-info-light">
      <div class="content">
        <h1>Pesquise por CEP</h1>
        <form @submit.prevent="search"> <!-- componentizar -->
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input" type="text" placeholder="Digite o CEP" v-model="searchCEP">
            </div>
            <div class="control">
              <button type="submit" class="button is-info">Pesquisar</button>
            </div>
          </div>
        </form>

        <div v-if="messageError" class="notification is-light is-danger mt-2"> <!-- componentizar -->
          <button class="delete" v-on:click="closeNotification()"></button>
          {{ messageError }}
        </div>
      </div>
    </div>
    <div class="block has-background-info-light" v-if="Object.keys(address).length > 0">
      <div class="content"> <!-- componentizar -->
        <p>
          <span class="is-capitalized has-text-weight-bold">cep: </span>	{{address.cep}} <br/>
          <span class="is-capitalized has-text-weight-bold">Logradouro: </span> {{address.street}} <br/>
          <span class="is-capitalized has-text-weight-bold">Complemento: </span> {{address.complement}} <br/>
          <span class="is-capitalized has-text-weight-bold">Bairro: </span> {{address.neighborhood}} <br/>
          <span class="is-capitalized has-text-weight-bold">Cidade: </span> {{address.city}} <br/>
          <span class="is-capitalized has-text-weight-bold">UF: </span> {{address.uf}} <br/>
          <span class="is-capitalized has-text-weight-bold">DDD: </span> {{address.ddd}}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import http from "@/config/http";

@Options({
  data() {
    return {
      searchCEP: null,
      messageError: null,
      address: {} //criar uma classe
    }
  },
  methods: {
    closeNotification: function(){
      this.messageError = null;
    },
    async search() {
      this.messageError = null;

      if (!this.searchCEP) {
        this.messageError = "Digite um CEP";
        return;
      }

      //usar store
      await http.get(`${this.searchCEP}/json/`)
        .then(request => {
          this.address.cep  = request.data.cep;
          this.address.street = request.data.logradouro;
          this.address.complement = request.data.complemento;
          this.address.neighborhood = request.data.bairro;
          this.address.city = request.data.localidade;
          this.address.uf = request.data.uf;
          this.address.ddd = request.data.ddd;
        })
        .catch(error => {
          this.address = {};

          if (400 === error.request.status ) { //não funcionou
            this.messageError = "CEP incorreto";
            return;
          }

          if (404 === error.request.status ) { //não funcionou
            this.messageError = "CEP não encontrado";
            return;
          }

          this.messageError = "Ops, houve um problema tente novamente em instantes.";
        });
    }
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.content{
  padding: 20px;
}
</style>