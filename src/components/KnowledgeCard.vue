<template>
  <div class="block-card">
    <el-card 
      class="box-card" 
      style="width:60%"
    >
      <div 
        slot="header" 
        class="clearfix"
      >
        <el-tag style="height:30px">{{ tag }}</el-tag>
        &nbsp;<span>{{ question }}</span>
        <el-button 
          style="float: right; padding: 3px 0" 
          type="text" 
          @click="showChange"
        >{{ this.button }}</el-button>
      </div>
      <pre 
        class="text item" 
        v-show="showUp" 
        style="white-space:pre-wrap;"
      >{{ answer }}</pre>

      <div style="float:right">
        <el-radio-group 
          v-model="showresult" 
          @change="submittmp"
        >
          <el-radio label="1">通过</el-radio>
          <el-radio label="0">重新记忆</el-radio>
        </el-radio-group>
        &nbsp;
        <el-checkbox 
          v-model="marked" 
          @change="markquestion"
        >标记</el-checkbox>
      </div>
      <br>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      button: '显示内容',
      showUp: '',
      showresult: '2',
      marked: false,
    }
  },
  created () {
    this.showUp = this.showAnswer
    this.showresult = this.result
    this.marked = this.mark
  },
  
  // eslint-disable-next-line
  props: ['question', 'answer', 'index', 'showAnswer', 'id', 'result', 'date', 'tag', 'mark'],

  methods: {
    showChange () {
      this.showUp = !this.showUp
      if (this.showUp === false) {
        this.button = '显示内容'
      } else {
        this.button = '隐藏内容'
      }
    },
    submittmp () {
      var answer = {}
      answer.id = this.id
      answer.result = this.showresult
      axios
        .post('/n/question/question/submitresult', JSON.stringify(answer))
        .then(response => {
        })
    },
    markquestion () {
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