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
        <span>{{ question }}</span>
        <el-tag 
          type="info" 
          style="height:30px;float: right;"
        >{{ username }}</el-tag>
      </div>
      <pre 
        class="text item" 
        style="white-space:pre-wrap;"
      >{{ answer }}</pre>

      <br>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  // eslint-disable-next-line
  props: ['question', 'answer', 'index', 'id', 'date', 'isprivate', 'username', 'tag'],

  methods: {
    edit: function () {
      var content = {}
      content.question = this.question
      content.answer = this.answer
      content.qid = this.id
      content.isprivate = this.isprivate
      this.$emit('edit', content)
    },
    deleteques: function () {
      this.$emit('deleteques', this.id)
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