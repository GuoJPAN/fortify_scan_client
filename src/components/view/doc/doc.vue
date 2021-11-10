<template>
    <div class="accept-container">

<iframe v-show="iframeState" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto src="http://101.35.185.109:8181/"></iframe>


    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      iframeState:true,
      goBackState:true,
    }
  },
  mounted(){
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + 'px';
    oIframe.style.height = deviceHeight + 'px';
  },
  methods:{
    goBack(){
      this.goBackState = false;
      this.iframeState = false;
    },
    showIframe(){
      this.goBackState = true;
      this.iframeState = true;
    }
  }
}

</script>
<style scoped>


</style>