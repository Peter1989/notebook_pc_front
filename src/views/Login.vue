<template>
  <el-container>

    <el-main>
      <div align="center">
        <div class="qrcode1" />
        <div class="qrcode2" />
      </div>
      <loginbar @formVisible="formVisible" />
      <el-dialog 
        :visible.sync="dialogFormVisible" 
        id="form" 
        style="width:1100px;"
      >
        <signupform @formVisible="formVisible" />
      </el-dialog>
    </el-main>

    <el-footer style="margin:0 auto">
      <font 
        class="font1" 
        style="font-size:13px"
      >&copy;知识点整理小助手</font>
    </el-footer>

  </el-container>
</template>

<script>
import loginbar from '../components/LoginBar'
import signupform from '../components/SignupForm'
export default {
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    formVisible (isvisable) {
      this.dialogFormVisible = isvisable
    }
  },
  components: {
    loginbar,
    signupform
  },
  created () {
      var asdf = this.$cookie.get('token');
      if(asdf != null){
        this.$router.push('/mycard')
      }
  }
}
</script>

<style scoped>
 #form{
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.font1{
  font-family: "PingFang SC";
}
.qrcode1{
  display: inline-block;
  width: 600px;
  height: 400px;
  background-size: 550px 170px;
  background-image: url('../assets/qrcode1.png');
  background-repeat: no-repeat;
  background-position:center;
}
.qrcode2{
  display: inline-block;
  width: 600px;
  height: 400px;
  background-size: 550px 170px;
  background-image: url('../assets/qrcode2.png');
  background-repeat: no-repeat;
  background-position:center;
}

</style>