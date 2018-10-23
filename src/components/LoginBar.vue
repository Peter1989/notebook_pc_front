<template>

  <div 
    id="form" 
    style="margin:20px auto;width:580px"
  >
    <el-form 
      :model="ruleForm2" 
      inline 
      size="mini" 
      :rules="rules2" 
      ref="ruleForm2" 
      label-width="55px" 
      class="demo-ruleForm"
    >

      <el-form-item prop="account">
        <el-input 
          type="text" 
          v-model="ruleForm2.account" 
          placeholder="用户名/手机号"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="ruleForm2.password" 
          placeholder="密码"
        />
      </el-form-item>

      <el-form-item>
        <el-button 
          type="primary" 
          @click="submitForm('ruleForm2')"
        >登陆</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="formVisible">注册</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="travel">游客</el-button>
      </el-form-item>

    </el-form>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名或手机号'));
      } else {
        callback();
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    return {
      ruleForm2: {
        account: '',
        password: ''
      },
      rules2: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    formVisible: function () {
      this.$emit('formVisible', true);
    },
    travel () {
      this.$router.push('mycard');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post('/n/question/user/login', this.ruleForm2)
            .then(response => {
            if (response.status !== 200) {
              this.Error('登陆', '服务器异常，请稍后再试');
              return;
            }else{
              if(response.data.success == true){
                this.Success('登陆', '登陆成功');
                this.resetForm('ruleForm2');
                this.$router.push('mycard');
              }else if(response.data.noaccount){
                this.Warn('登陆', '账号不存在');
              }else if(response.data.passwrong){
                this.Error('登陆', '密码错误');
              }
            }
         })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    Success(title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'success'
      })
    },
    Warn(title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'warning'
      })
    },
    Error(title, message) {
      this.$notify.error({
        title: title,
        message: message,
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>