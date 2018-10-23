<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu-demo" 
          mode="horizontal" 
          @select="handleSelect"
        >

          <router-link 
            to="/mycard" 
            style="text-decoration:none;"
          >
            <el-menu-item index="3">
              我的知识点
            </el-menu-item>
          </router-link>

          <router-link 
            to="/myoutline" 
            style="text-decoration:none;"
          >
            <el-menu-item index="5">
              我的知识大纲
            </el-menu-item>
          </router-link>

          <router-link 
            to="/addoutline" 
            style="text-decoration:none;"
          >
            <el-menu-item index="6">
              添加知识大纲
            </el-menu-item>
          </router-link>

        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu-demo" 
          mode="horizontal" 
          @select="handleSelect"
        >
          <!-- <router-link to="/profile" style="text-decoration:none;">
            <el-menu-item index="1">
              个人信息
            </el-menu-item>
          </router-link> -->
          <router-link 
            to="/login" 
            style="text-decoration:none;"
          >
            <el-menu-item index="2">
              退出登陆
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
    <router-view />

  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      activeIndex: '3'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
      if (key === '2') {
        this.$cookie.delete('token')
      }
      if(key === '5' || key === '6'){
        this.$notify({
          title: '功能正在开发，敬请期待',
          message: '',
          position: 'top-right'
        })
      }
    }
  },
  created () {
    if (this.$route.path === '/login') {
      this.activeIndex = '3'
    }
    if (this.$route.path === '/mycard') {
      this.activeIndex = '3'
    }
  }
}
</script>