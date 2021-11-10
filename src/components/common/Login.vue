<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Wellcome</div>
      <div class="ms-content">
        <el-input
          v-model="param.username"
          placeholder="username"
          class="loginiput"
        >
          <template #prepend>
            <el-button icon="el-icon-user"></el-button>
          </template>
        </el-input>
        <el-input
          type="password"
          placeholder="password"
          v-model="param.password"
          @keyup.enter="submitForm()"
          class="loginiput"
        >
          <template #prepend>
            <el-button icon="el-icon-lock"></el-button>
          </template>
        </el-input>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      param: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (!this.param.username || !this.param.password) {
        this.$message({
          message: "用户名或密码不能为空",
          type: 'error'
        })
        return
      }
      const data = this.param
      this.http.login(data).then(res => {
        if (res.data.status === 0) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.push("/codeScan")
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(
      )
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/hack1.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 85%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.loginiput {
  margin: 10px 0 10px 0;
}
.login-btn {
  text-align: center;
  margin-top: 10px;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
