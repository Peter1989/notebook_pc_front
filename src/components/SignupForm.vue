<template>
  <div>
    <div id="form">
      <div style="margin: 20px;" />
      <el-form 
        label-position="right" 
        label-width="80px" 
        style="width:500px" 
        :model="ruleForm1" 
        :rules="rules1" 
        size="mini" 
        ref="ruleForm1"
      >
        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item 
              label="用户名" 
              prop="username"
            >
              <el-input v-model="ruleForm1.username" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button 
              type="primary" 
              size="mini" 
              @click="checkUsername(ruleForm1.username)"
            >检查用户名是否可用</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item 
              label="密码" 
              style="width:350px" 
              prop="password"
            >
              <el-input 
                v-model="ruleForm1.password" 
                type="password"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span style="font-size:10px">密码为6-20位字符</span>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item 
              label="密码确认" 
              style="width:350px" 
              prop="passwordAgain"
            >
              <el-input 
                v-model="ruleForm1.passwordAgain" 
                type="password"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span style="font-size:10px">请再次输入密码</span>
          </el-col>
        </el-row>


        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item 
              label="手机" 
              style="width:350px" 
              prop="phone"
            >
              <el-input v-model="ruleForm1.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span style="font-size:10px">用于找回密码</span>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="17">
            <el-form-item 
              label="验证码" 
              prop="code"
            >
              <el-input v-model="ruleForm1.code" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button 
              type="primary" 
              size="mini" 
              @click="sendCode"
            >发送手机验证码</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <div 
      slot="footer" 
      class="dialog-footer"
    >
      <el-button 
        style="margin-left:80px" 
        type="primary" 
        @click="submitForm('ruleForm1')" 
        size="mini"
      >确 定</el-button>
      <el-button 
        @click="formVisible(false)" 
        size="mini"
      >取 消</el-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
	data () {
		var validateUsername = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入用户名'))
			} else {
        callback();
      }
		}
		var validatePassword = (rule, value, callback) => {
			if (value.length < 6 || value.length > 20){
        callback(new Error('密码格式不对'))
      } else {
        callback();
      }
		}
		var validatePasswordAgain = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm1.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
        callback();
      }
		}
		var validatePhone = (rule, value, callback) => {
			if (!value.match(/^1[34578]\d{9}$/)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback();
      }
		}
		var validateCode = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入验证码'))
			} else {
        callback();
      }
		}
		return {
			rules1: {
				username: [
				{ validator: validateUsername, trigger: 'blur' }
				],
				password: [
				{ validator: validatePassword, trigger: 'blur' }
				],
				passwordAgain: [
				{ validator: validatePasswordAgain, trigger: 'blur'}
				],
				phone: [
				{ validator: validatePhone, trigger: 'blur'}
				],
				code: [
				{ validator: validateCode, trigger: 'blur'}
				]
			},
			ruleForm1: {
				username: '',
				password: '',
				passwordAgain: '',
				phone: '',
				code: ''
			}
		}
	},
	methods: {
		submitForm (formname) {
      this.$refs[formname].validate((valid) => {
        if(valid){
          var submitData = {}
          submitData.username = this.ruleForm1.username
          submitData.password = this.ruleForm1.password
          submitData.phone = this.ruleForm1.phone
          submitData.code = this.ruleForm1.code

          axios
          .post('/n/question/user/signup', submitData)
          .then(response => {
            if (response.status !== 200) {
              this.Error('注册', '服务器异常，请稍后再试')
              return
            }else{
              if(response.data.success == true){
                this.Success('注册', '注册成功')
                this.formVisible(false)
                this.resetForm('ruleForm1')
                this.$router.push('home')
              }else if(response.data.overtime){
                this.Warn('注册', '验证码超时')
              }else if(response.data.codewrong){
                this.Error('注册', '验证码错误')
              }else if(response.data.datarepeat){
                this.Warn('注册', '用户名或手机号已被注册')
              }

            }
         })
        }
      })
		},
		checkUsername (username) {
      axios
      .get('/n/question/user/checkuser?username=' + username)
        .then(response => {
          if(response.data.avail == true){
            this.Success('用户名', '用户名可以使用')
          } else {
            this.Error('用户名', '用户名已经被使用')
          }
        })
		},
    sendCode () {
      this.$refs['ruleForm1'].validateField('phone', (valid) => {
        if(valid == '手机号格式错误'){
          return
        } else {
          axios
          .post('/n/question/user/sendcode', {'phone': this.ruleForm1.phone})
          .then(response => {
            if(response.data.success == true){
              this.Success('验证码', '验证码发送成功')
            }else if(response.data.overFrequency){
              this.Warn('验证码', '请求验证码过于频繁，请稍后再试')
            }else if(response.data.overtimes){
              this.Warn('验证码', '请求验证码次数已达到上限')
            }else if(response.data.serverError){
              this.Error('验证码', '服务器异常，请稍后再试')
            }else if(response.data.phonepatten){
              this.Warn('验证码', '手机号格式错误')
            }
          })
        }
      })
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
    },
    formVisible: function (isvisable) {
      this.$emit('formVisible', isvisable)
    },
	}
}
</script>
<style>
</style>