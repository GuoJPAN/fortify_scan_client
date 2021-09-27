<template>
  <div class="from_box">
    	<form action="http://113.108.70.111:55138/reset.php" method="post">
			<input type="password" name="newpassword" value="12345"/>
			<input type="password" name="repeatpassword" value="12345"/>
			<input name="Submit" Value="Login"/>
            <input type="submit" value="提交" id="btn">
		</form>

  </div>
</template>
 
<script>
import axios from 'axios';
 
export default {
  name: "from",
  data() {
    return {
    	formMess:{
	    "newPassword":"12345",
	    "repeatPassword":"12345",
	}
    };
  },
  methods: {
    onSubmit() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formMess);
 
      /* formData格式提交： */
      let formData = new FormData();
      formData.append("newPassword","12345");
      formData.append("repeatPassword","12345");
 
        axios({
	    method:"post",
	    url:"http://113.108.70.111:58123/reset.php",
	    headers: {
		  "Content-Type": "multipart/form-data"
	    },
	    withCredentials:true,
	    data:formData
	}).then((res)=>{
            console.log(res);
        });
    }
  },
    mounted: function () {
    document.getElementById("btn").click
  }

};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>