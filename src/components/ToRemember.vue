<template>
  <div>
    <div>
      <el-row 
        :gutter="20" 
        v-for="(item, index) in question" 
        :key="item.id"
      >
        <el-col 
          :span="18" 
          :offset="6"
        ><div class="grid-content bg-purple"><knowledgecard 
          :question="item.question_text" 
          :answer="item.answer_text" 
          :result="item.result" 
          :index="index" 
          :id="item.id" 
          :date="item.date" 
          :tag="item.tag" 
          :mark="item.mark == '1'" 
          :show-answer="false" 
          @changeResult="changeResult"
        /></div></el-col>
      </el-row>
    </div>

    <el-button 
      id="submitbutton" 
      type="primary" 
      @click="submitanswers"
    >提交复习过的知识点</el-button>

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
import knowledgecard from '@/components/KnowledgeCard'
import axios from 'axios'
export default {
  data () {
    return {
      question: [],
      showAnswer: [],
      cacheamount: 0,
      percentage: 0,
      page: 1,
      size: 10,
      nomore: false,
      loading: false
    }
  },
  created () {
    this.getData()
  },
  components: {
    knowledgecard
  },
  methods: {
    open7 () {
      this.$notify({
        title: '没有更多知识点啦',
        message: '今日没有待复习知识点或者已经复习完毕',
        position: 'top-right'
      })
    },

    getData () {
      this.loading = true
      axios
        .get('/n/question/question/questionlist?page=' + this.page + '&size=' + this.size)
        .then(response => {
          this.question = response.data.list
          console.log(this.question)
          this.cacheamount = response.data.amount
          var percentage = parseInt((this.page * this.size / this.cacheamount) * 100)
          if (percentage >= 100 || isNaN(percentage)) {
            percentage = 100
            this.nomore = true
          } else {
            this.nomore = false
          }

          this.percentage = percentage

          if (!this.question) {
            this.nomore = true
            this.open7()
            return
          }
          this.loading = false
        })
    },

    changeResult: function (index, result) {
      this.question[index].result = result
    },

    previousPage: function () {
      this.page--
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    submitanswers () {
      this.$confirm('此操作将提交今日所复习内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        this.submitTotalAnswer()
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        this.$router.push('toremember')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },

    nextPage: function () {
      this.page++
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    submitTotalAnswer () {
      axios
        .post('/n/question/question/submittotal')
        .then(response => {
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
#submitbutton{
  position:fixed;
  right:100px;
  top:20%;
}
</style>