<template>
  <div>
    <el-row 
      :gutter="20" 
      v-for="(item, index) in questions" 
      :key="item.id"
    >
      <el-col 
        :span="18" 
        :offset="6"
      ><div class="grid-content bg-purple"><hotcard 
        :question="item.question_text" 
        :answer="item.answer_text" 
        :index="index" 
        :id="item.id" 
        :date="item.date" 
        :isprivate="item.isprivate" 
        :username="item.username" 
        :tag="item.tag"
      /></div></el-col>
    </el-row>

    <el-button 
      class="icon-left" 
      type="primary" 
      round 
      plain 
      icon="el-icon-arrow-left" 
      @click="previousPage" 
      size="mini" 
      v-show="page > 1" 
      v-loading="loading"
    />
    <el-button 
      class="icon-right" 
      type="primary" 
      round 
      plain 
      icon="el-icon-arrow-right" 
      @click="nextPage" 
      size="mini" 
      v-show="!this.nomore" 
      v-loading="loading"
    />

    <el-progress 
      id="percentage" 
      :percentage="this.percentage" 
      :show-text="false" 
      :stroke-width="6" 
      type="circle"
    />

  </div>
</template>

<script>
import hotcard from '@/components/HotCard'
import axios from 'axios'
export default {
  data () {
    return {
      page: 1,
      size: 10,
      questions: [],
      amount: 0,
      isprivate: false,
      privatetext: '公开',
      nomore: false,
      percentage: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      loading: false
    }
  },

  created () {
    this.getData()
  },
  components: {
    hotcard
  },

  methods: {
    open7 () {
      this.$notify({
        title: '没有更多知识点啦',
        message: '我的知识点中没有更多内容啦',
        position: 'top-right'
      })
    },
    previousPage: function () {
      this.page--
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    nextPage: function () {
      this.page++
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    getData () {
      this.loading = true
      axios
        .get('/n/question/question/groundall?page=' + this.page + '&size=' + this.size)
        .then(response => {
          this.questions = response.data.list
          this.amount = response.data.amount
          var percentage = parseInt((this.page * this.size / this.amount) * 100)
          if (percentage >= 100) {
            percentage = 100
            this.nomore = true
          } else {
            this.nomore = false
          }

          this.percentage = percentage

          if (!this.questions) {
            this.nomore = true
            this.open7()
          }
          this.loading = false
        })
    },
    open8 () {
      this.$message({
        showClose: true,
        message: '系统异常',
        type: 'error'
      })
    }
  }
}
</script>
<style>
.icon-left{
  position:fixed;
  left:100px;
  top:50%;
}
.icon-right{
  position:fixed;
  right:100px;
  top:50%;
}
#percentage{
  position:fixed;
  right:100px;
  top:80%;
}
#addbutton{
  position:fixed;
  right:100px;
  top:20%;
}
</style>