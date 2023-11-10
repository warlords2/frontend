<template>
  <div ref="renderer" class="canvas" v-bind:class="{ 'movendo-cursor': controlle.movendo.status, 'removendo-cursor': controlle.removendo.status }">
    <div class="controlles" v-if="controlle.show">
      <div class="controlle resize-link"  @click="ativarMovendo"></div>
      <div class="controlle remover-link" @click="ativarRemovendo"></div>
      <div class="controlle mochila-link" @click="ativarMochila">
        <div class="controlle-mochila-notificacao">
          {{ items.length  }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
     export default {
        name: 'GamePage',
        data() {
            return {
                acconts:null,
                controlle:{
                  show: false,
                  movendo:{
                    status:false,
                    listener:[]
                  },
                  removendo:{
                    status:false,
                    listener:[]
                  }
                }
             }
        },
        methods:{
           colocarNoJogo(indexItem){},
           ativarMochila(){},
           ativarMovendo(){},
           ativarRemovendo(){}
        },
        mounted() {
            
            var gameRender = this.$refs['renderer'];
            var load = require;
            this.$Game.build(gameRender, window.innerWidth, window.innerHeight, this.$config);

            window.addEventListener('resize', () => {
              this.$Game.resize( window.innerWidth, window.innerHeight);
            });

        }
    }
</script>
<style>
    .controlles{
        position: fixed;
        bottom: 0;
        z-index: 6;
        margin-left: auto;
        margin-right: auto;
        display: block;
        width: 18vw;
        height: auto;
        min-height: 17px;
        max-height: 72px;
        margin-left: calc( 50vw - 9vw);
        background-color: transparent;
    
    }
    .controlles .controlle{
        display: inline-block;
        width: 30%;
        background-color: transparent;
        min-height:40px;
        cursor: pointer;
        background-size: contain;
        height: 100%;
        transition: 1s all;
    }
    .controlle.remover-link{
    min-height:37px;
    }
    .controlles .controlle:hover{
        transform: scale(1.3); 
        transition: 1s all;
    }
    .controlle-mochila-notificacao{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100px;
        display: inline-block;
        margin-left: 10px;
        padding-top: 2.5px;
        padding-left: 1.3px;
        padding-right: 1px;
        background-color: #1b7dc3;
        color: white;
        text-align: center;
        font-size: 0.86em;
        vertical-align: middle;
    }
</style>