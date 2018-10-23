<template>
  <div class="block-card">
    <el-card 
      class="box-card" 
      style="width:100%"
    >
      <div 
        slot="header" 
        class="clearfix"
      >
        <el-tag style="height:30px">{{ tag }}</el-tag>
        <el-tag 
          type="info" 
          style="height:30px" 
          v-show="isprivate == '1'"
        >私密</el-tag>
        &nbsp;<span>{{ question }}</span>

        <el-button 
          style="float: right; padding: 3px 0" 
          type="text" 
          @click="edit"
        >编辑</el-button>
        <el-checkbox 
          style="float: right; padding: 0 10px" 
          v-model="marked" 
          @change="submitmark"
        >已标记</el-checkbox>
      </div>
      <pre 
        class="text item" 
        style="white-space:pre-wrap;"
      >{{ answer }}</pre>
      <el-button 
        type="danger" 
        round 
        size="mini" 
        style="float:right" 
        @click="deleteques"
      >删除</el-button> 
      <br>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      marked: false,
    }
  },
  created () {
    this.marked = this.mark
  },
  
  // eslint-disable-next-line
  props: ['question', 'answer', 'index', 'id', 'date', 'isprivate', 'tag', 'tagcode', 'mark'],

  methods: {
    edit: function () {
      var content = {}
      content.question = this.question
      content.answer = this.answer
      content.qid = this.id
      content.isprivate = this.isprivate
      content.tag = this.tag
      this.$emit('edit', content)
    },
    deleteques: function () {
      this.$emit('deleteques', this.id)
    },
    submitmark: function () {
      var answer = {}
      answer.id = this.id
      answer.mark = this.marked
      axios
        .post('/n/question/question/submitmark', JSON.stringify(answer))
        .then(
          response => {}
        )
    } 
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
  }

  .block-card {
    margin: 20px 0px;
  }
</style>