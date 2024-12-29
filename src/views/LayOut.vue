<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title class="text-h6">
                    测试平台
                </v-list-item-title>
                <v-list-item-subtitle>
                    dyming
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                :href="item.link"
                >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>dyming测试平台</v-toolbar-title>
      <!-- 退出按钮 -->
       <v-row>
        <v-col cols="11"></v-col>
        <v-col cols="1">
          <v-btn
            tile
            color="#82B1FF"
            @click="exit"
          >
            退出
          </v-btn>
        </v-col>
       </v-row>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
         drawer: null,
         items: [
          { title: '测试用例', icon: 'mdi-view-dashboard',link:'#/layout/testcase'},
          { title: '测试任务', icon: 'mdi-image',link:'#/layout/task' },
          { title: '测试报告', icon: 'mdi-help-box',link:'#/layout/report' },
        ],
        right: null,
         }),
        methods:{
          exit(){
          //1.清空token
          localStorage.removeItem('token');
          //2.页面跳转到登录页面
          this.$router.push('/login');
        }
     }
  }
</script>