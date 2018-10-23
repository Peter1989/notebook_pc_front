<template>
  <div>
    <div class="toolline">
      <el-cascader
        class="selector"
        :options="options"
        v-model="selectItem"
        :show-all-levels="false"
      />
      <el-checkbox 
        v-model="marked" 
        class="markfilter"
      >已标记</el-checkbox>
      <el-button 
        class="search" 
        type="primary" 
        @click="selectedItem"
      >搜索</el-button>
      <el-button 
        class="reset" 
        type="primary" 
        @click="reset"
      >重置</el-button>
      <el-button 
        class="addbutton" 
        type="primary" 
        @click="dialogFormVisible = true"
      >添加知识点</el-button>
    </div>

    <div class="grid-content bg-purple-light card-content">
      <el-row 
        v-for="(item, index) in questions" 
        :key="item.id"
      >
        <mycard 
          :question="item.question_text" 
          :answer="item.answer_text" 
          :index="index" 
          :id="item.id" 
          :date="item.date" 
          :isprivate="item.isprivate" 
          :tag="item.tag" 
          :mark="item.mark == '1'"
          @edit="edit" 
          @deleteques="deleteques"
        />
      </el-row>
    </div>

    <el-pagination
      class="pagination"
      :page-size="size"
      :pager-count="11"
      layout="prev, pager, next"
      :total="amount"
      @current-change="currentChange"
      @prev-click="previousPage"
      @next-click="nextPage"
    />

    <div>
      <el-dialog 
        :visible.sync="dialogFormVisible" 
        :show-close="showclose"
        @close="resetForm"
      >
        <div id="form">
          <el-row>
            <el-col :span="18"><div class="grid-content">

              <el-form 
                label-width="80px" 
                :model="formLabelAlign" 
                size="mini"
              >
                <el-form-item 
                  label="标题" 
                  style="width:90%"
                >
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="formLabelAlign.question"
                    style="width:100%"
                  />
                </el-form-item>

                <el-form-item 
                  label="内容" 
                  style="width:90%"
                >
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"
                    placeholder="请输入内容"
                    style="width:100%"
                    v-model="formLabelAlign.answer"
                  />
                </el-form-item>
                
                <el-form-item 
                  label="标签" 
                  style="width:90%"
                >
                  <span v-if="this.formLabelAlign.isedit === 1">
                    {{ tagname }} &nbsp;
                    更改标签为 &nbsp;
                  </span>
                  <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    :show-all-levels="false"
                  />
                </el-form-item>
              </el-form>

            </div></el-col>
            <el-col :span="6"><div class="grid-content">
              <el-switch
                v-model="isprivate"
                :active-text="privatetext"
                @change="changeprivate"
              />
            </div></el-col>
          </el-row>

        </div>
        <div 
          slot="footer" 
          class="dialog-footer"
        >
          <el-button 
            type="primary" 
            @click="submitQuestion" 
            size="mini"
          >确 定</el-button>
          <el-button 
            @click="deny" 
            size="mini"
          >取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mycard from '@/components/MyCard'
import axios from 'axios'
export default {
  data () {
    return {
      page: 1,
      size: 10,
      questions: [],
      amount: 0,
      marked: false,
      isprivate: false,
      privatetext: '公开',
      nomore: false,
      percentage: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formLabelAlign: {
        question: '',
        answer: '',
        isedit: 0,
        qid: 0
      },
      selectedOptions: [],
      selectItem: [],
      loading: false,
      showclose: false,
      options:[],
      tagname: ''
    }
  },
  created () {
    this.getData();
    this.getTags();
  },
  components: {
    mycard
  },
  methods: {
    reset(){
      this.selectItem = [];
      this.marked = false;
      this.getData();
      this.getTags();
    },
    open7 () {
      this.$notify({
        title: '没有更多知识点啦',
        message: '我的知识点中没有更多内容啦',
        position: 'top-right'
      })
    },
    previousPage () {
      this.page--
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    nextPage () {
      this.page++
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    selectedItem () {
      this.page = 1
      this.getData()
    },
    currentChange(page){
      this.page = page;
      this.getData();
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    getTags ( ) {
      var request = '/n/question/tag/gettags?level=all';
      var options;
      axios
        .get(request)
        .then(response => {
          var levelOneArr = response.data.tagsOne;
          var levelTwoArr = response.data.tagsTwo;
          var levelThreeArr = response.data.tagsThree;
          
          if (levelOneArr.length === 0) {
            return;
          }
          options = [];
          for(var i = 0,lenone = levelOneArr.length; i < lenone; i++){
            var currleveloneid = levelOneArr[i].id;
            var currlevelonetext = levelOneArr[i].tagname;
            var itemone = {
              'value' : currleveloneid,
              'label' : currlevelonetext
            }
            options.push(itemone)

            var itemtwo = {};
            var columnTwo = levelTwoArr.filter((item, index, array) => {
              var uplevelid = currleveloneid;
              return item.uplevelid === uplevelid;
            });

            options[i]['children'] = [];
            for(var j = 0,lentwo = columnTwo.length; j < lentwo; j++){
              var currleveltwoid = columnTwo[j].id;
              var currleveltwotext = columnTwo[j].tagname;
              var itemtwo = {
                'value' : currleveltwoid,
                'label' : currleveltwotext
              }

              options[i]['children'].push(itemtwo);
              var columnThree = levelThreeArr.filter((item, index, array) => {
                var uplevelid = currleveltwoid;
                return item.uplevelid === uplevelid;
              });

              options[i]['children'][j]['children'] = [];
              for(var k = 0,lenthree = columnThree.length; k < lenthree; k++){
                var currlevelthreeid = columnThree[k].id;
                var currlevelthreetext = columnThree[k].tagname;
                var itemthree = {
                  'value' : currlevelthreeid,
                  'label' : currlevelthreetext
                }
                options[i]['children'][j]['children'].push(itemthree);
              }
            }
          }

          this.options = options;
      })
    },
    getData () {
      var request = '/n/question/question/questionall?page=' + this.page + '&size=' + this.size;
      
      if(this.selectItem[2]){
        request = request + '&tag=' + this.selectItem[2]
      }

      if(typeof(this.marked) != 'undefined'){
        request = request + '&marked=' + this.marked
      }

      this.loading = true
      axios
        .get(request)
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
    submitQuestion () {
      var postdata = {}
      postdata.question = this.formLabelAlign.question
      postdata.answer = this.formLabelAlign.answer
      postdata.qid = this.formLabelAlign.qid
      postdata.isprivate = this.isprivate == true ? '1' : '0'

      if(this.selectedOptions.length === 0 && this.formLabelAlign.isedit !== 1){
        this.$notify({
          title: '请先在小程序端加入标签',
          message: '',
          position: 'top-right'
        })
      }else{
        postdata.tag = this.selectedOptions[2];
      }

      if (this.formLabelAlign.isedit) {
        axios
        .post('/n/question/question/editquestion', postdata)
        .then(response => {
          // if (response.status !== 200) {
          //   this.open8()
          // }
        this.formLabelAlign.isedit = 0
        this.dialogFormVisible = false
        this.formLabelAlign.question = ''
        this.formLabelAlign.answer = ''
        this.resetForm()
        this.formLabelAlign.qid = 0
        this.getData()
        })
      } else {
        axios
        .post('/n/question/question/addquestion', postdata)
        .then(response => {
          if (response.status !== 200) {
            this.open8()
          }
          this.dialogFormVisible = false
          this.resetForm()
          this.getData()
        })
      }
    },
    resetForm () {
      var reset = {
        question: '',
        answer: '',
      }
      this.formLabelAlign = reset
      this.isprivate = 0
      this.privatetext = '公开'
      this.selectedOptions = []
    },
    open8 () {
      this.$message({
        showClose: true,
        message: '系统异常',
        type: 'error'
      })
    },
    edit (content) {
      console.log(content);
      this.formLabelAlign.question = content.question
      this.formLabelAlign.answer = content.answer
      this.formLabelAlign.qid = content.qid
      this.dialogFormVisible = true
      this.formLabelAlign.isedit = 1
      this.isprivate = content.isprivate == '1'
      this.tagname = content.tag
      this.changeprivate()
    },
    deleteques (qid) {
      var postdata = {}
      postdata.qid = qid
      axios
        .post('/n/question/question/deletequestion', postdata)
        .then(response => {
          if (response.status !== 200) {
            this.open8()
            return
          }
          this.dialogFormVisible = false
          this.resetForm()
          this.getData()
        })
    },
    deny () {
      this.dialogFormVisible = false
      this.formLabelAlign.question = ''
      this.formLabelAlign.answer = ''
      this.formLabelAlign.qid = 0
      this.isprivate = 0
      this.privatetext = '公开'
    },
    changeprivate () {
      if(this.isprivate == 0){
        this.privatetext = "公开"
      }else{
        this.privatetext = "私密"
      }
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

.toolline{
  width: 1100px;
  margin: 20px auto 20px;
}
.selector{
  width:200px;
  margin-left: 50px;
  margin-right: 50px;
}
.markfilter{
  margin-right: 30px;
}
.search{
  margin-right: 30px;
}
.reset{
  margin-right: 330px;
}
.card-content{
  width: 1000px;
  margin: 0 auto 0;
}
.pagination{
  width: 400px;
  margin: 20px auto 20px;
}
</style>