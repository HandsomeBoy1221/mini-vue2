<template>
  <v-app id="register">
    <v-main>
        <v-container class="register">
            <v-row>
                <!-- xs:超小；sm:小；md:中等；lg:大 -->
                <v-col cols="12" sm="8">
                    <v-form
                        ref="registerForm" 
                        v-model="valid" 
                        lazy-validation
                    >
                        <h1>注册</h1>
                        <v-col cols="12">
                          <v-text-field
                            v-model="username"
                            :counter="10"
                            :rules="nameRules"
                            label="账号"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12"> 
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                          ></v-text-field>
                        </v-col>  
                        <v-col cols="12"> 
                          <v-text-field
                              v-model="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="passwordRules"
                              :type="show1 ? 'text' : 'password'"
                              name="password"
                              label="密码"
                              hint="至少3个字符"
                              counter
                              @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>  

                        <v-col cols="12"> 
                          <v-text-field
                              v-model="confirmPassword"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="passwordRules"
                              :type="show1 ? 'text' : 'pwd'"
                              name="confirmPassword"
                              id="confirmPassword"
                              label="确认密码"
                              hint="至少3个字符"
                              counter
                              @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col> 


                         <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="register"
                        >
                        注册
                        </v-btn>

                        <v-btn
                        color="primary"
                        class="mr-4"
                        @click="clear"
                        >
                        重置
                        </v-btn>
                        <v-btn
                        color="orange"
                        class="mr-4"
                        @click="login"
                        >
                        登录
                        </v-btn>
                    </v-form>


                </v-col>
            </v-row>
        </v-container>
    </v-main>
    

  </v-app>
</template>

<script>
  export default {
  data: () => ({
      valid: true,
      show1: false,
      username: '',
      nameRules: [
        v => !!v || '账号不能为空',
        v => (v && v.length <= 10) || '您输入的账号格式不正确',
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || '密码不能为空',
        v => (v && v.length >= 3) || '您输入的密码格式有误',
      ],
      email: '',
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+/.test(v) || '您输入的邮箱格式有误',
      ],
    }),
    methods: {
      register () {
        console.log('账号', this.username)
        console.log('密码', this.password)
        console.log('确认密码', this.confirmPassword)
        if(this.password===this.confirmPassword){
          this.$api.user.register(
            {
              'username': this.username,
              'password': this.password,
              'email':this.email
            }
          ).then((result) => {
            console.log("register", result)
            if (result.data.code === 0){
              window.alert( '注册成功，请使用已经注册的账号登录～')
              this.snackbar = true
              this.$router.push('/login');
            } else if (result.data.errcode === 40011) {
              window.alert("账号为空")
            } else if (result.data.errcode === 40012) {
              window.alert("密码为空")
            } else if (result.data.errcode === 40015) {
              window.alert("用户已经存在")
            } else if (result.data.errcode === 40022) {
                window.alert("注册失败")
            } else {
              window.alert("注册失败")
            }
          }).catch((err) => {
            console.log(err)
            window.alert("注册失败")
          });
        }else{
          window.alert("两次密码输入不一致,请重新输入")
        }
        
      },
      clear () {
        this.username='',
        this.password='',
        this.confirmPassword='',
        this.email=''
      },
      login () {
         //页面跳转到登录页面
        this.$router.push('/login');
      }
    },
  }
</script>


<style scoped>
.register {
  width: 500px;
  margin: auto;
  text-align: center;
}
</style>