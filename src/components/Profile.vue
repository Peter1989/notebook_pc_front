<template>
  <div id="content">
    <form>
      <header>基本信息</header>
      <ul>
        <li>
          <span class="b-left-m">性别：&ensp;</span>
          <input 
            type="radio" 
            name="gender" 
            checked="true" 
            value="1"
          >
          &ensp;男&emsp;
          <input 
            type="radio" 
            name="gender" 
            value="2"
          >
          &ensp;女
        </li>
        <li>
          <span class="b-left-m">出生日期：&ensp;</span>
          <input 
            class="input-text" 
            size="3" 
            type="text" 
            name="year" 
            value="1989" 
            style="width:40px;"
          >
          年
          <input 
            class="input-text" 
            size="2" 
            type="text" 
            name="month" 
            value="8"
          >
          月
          <input 
            class="input-text" 
            size="2" 
            type="text" 
            name="month" 
            value="22"
          >
          日
          <span class="b-right-m">如果不想填，请全部留空</span>
        </li>
      </ul>
      <header>头像设置</header>
      <ul>
        <li class="upload">
          <span class="b-left-m">自定义头像：</span>
          <span class="upload-botton">选择文件</span>
          <input 
            class="upload-file" 
            type="file"
          >
        </li>
      </ul>
      <header>联系信息</header>
      <ul>
        <li>
          <span class="b-left-m">微信：&ensp;</span>
          <input 
            class="input-text" 
            name="wechat"
          >
          <span class="b-right-m">填写您的微信，方便与他人的联系</span>
        </li>
        <li>
          <span class="b-left-m">主页：&ensp;</span>
          <input 
            class="input-text" 
            name="webpage"
          >
          <span class="b-right-m">填写您的个人主页地址，展示您的网上风采</span>
        </li>
        <li>
          <span class="b-left-m">Email：&ensp;</span>
          <input 
            class="input-text" 
            name="email"
          >
          <span class="b-right-m">您的有效电子邮件地址</span>
        </li>
        <li>
          <span 
            class="b-left-m" 
            style="vertical-align:top"
          >签名档：&ensp;</span>
          <textarea 
            class="input-text" 
            rows="5" 
            cols="80"
          />
        </li>
      </ul>
      <header />
      <div style="margin:30px 130px 30px;">
        <input 
          type="button" 
          class="upload-botton" 
          value="提交修改"
        >
        <input 
          type="button" 
          class="upload-botton" 
          value="重写"
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {

    }
}
</script>

<style>
    #content{
        width: 70%;
        border: 1px solid #598edd;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        margin-top: 2%;
        padding-top: 10px;
        padding-left: 13px;
        margin-left: 50%;
        transform: translateX(-50%); 
    }
    header{
        border-bottom: 1px solid #C9D7F1;
        font-weight: bold;
        color: #598EDE;
    }
    .b-left-m{
        display: inline-block;
        width: 120px;
        font-size: 14px;
        text-align: right;
        padding-top: 3px;
        color: #666;
        font-weight: bold;
    }
    ul, li {
        list-style: none;
        margin-bottom: 10px;
    }
    .b-right-m{
        font-size: 12px;
        text-align: right;
        color: #666;
        padding-left: 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .upload{
        position: relative;
        display: inline-block;
    }
    .upload-botton{
        width: 60px;
        height: 20px;
        margin-left: 10px;
        display: inline-block;
        background: -webkit-gradient(linear,0% 0%,0% 100%,from(#EEF6FF),to(#E1EAF2));
        border: 1px solid #77a2d2;
        font-size: 12px;
        border-radius: 4px;
        text-align: center;
        vertical-align: middle;
    }
    .upload-file{
        width: 60px;
        height: 20px;
        border-radius: 4px;
        position: absolute;
        top: 4px;
        right: 2px;
        opacity: 0;
        z-index: 10;
    }
    .input-text{
        padding-top:3px;
        border-radius: 4px;
        border: 1px solid #598edd;
    }
</style>