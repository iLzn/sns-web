<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="900px"
      top="5vh"
      @close="this.dialogChange"
    >
      <!-- 对话框主内容盒 -->
      <div class="dialogContext flex column">
        <!-- 标题 -->
        <div class="dialogMsgTitle">
          在<a>xxx</a>话题
          <hr />
        </div>
        <!-- 内容盒 -->
        <div class="dialogMsgBox">
          <ul class="flex column">
            <li class="flex">
              <!-- 头像 -->
              <div class="headerImg"></div>
              <!-- 内容 -->
              <div class="content bk flex column bc">
                <!-- 内容头 -->
                <div class="contentTile">xxx评论:</div>
                <!-- 主内容 -->
                <div class="msgContent">hahhahah</div>
                <!-- 内容尾 -->
                <div class="footer">11点34分</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="dialogMsgTextBox">
          <!-- 评论框 -->
          <el-input
            :autosize="{ minRows: 3 }"
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="dialogFooter flex">
          <button class="pianoButton big-button mright dialogFont">已读</button>
          <button class="pianoButton big-button dialogFont">回复</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "topicMsgDialog",
  props: ["dialogMsgVisible", "dialogChange", "topicMsg", "diaglogId"],
  data() {
    return {
      textarea: "",
      dialogVisible: this.dialogMsgVisible,
      dialogTopicMsg: this.topicMsg,
      dialogTopicId: this.diaglogId,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  watch: {
    // 监视对话框可视化
    dialogMsgVisible() {
      this.dialogVisible = this.dialogMsgVisible;
    },
    // dialogTopicMsg() {
    //   this.dialogTopicMsg = this.topicMsg;
    // },
  },
};
</script>

<style scoped>
@import "../../style/css/msgButton.css";
.bk {
  border: 1px solid black;
}

.dialogContext {
  width: 95%;
  align-items: center;
}

.flex {
  display: flex;
}

.column {
  flex-direction: column;
}

.yj {
  border-radius: 10px;
}
.bc {
  background-color: #eee;
}

.dialogMsgBox {
  width: 95%;
}
.dialogMsgTextBox {
  width: 95%;
  margin-top: 20px;
  background-color: aqua;
  justify-items: center;
}
.dialogFooter {
  width: 95%;
  margin-top: 10px;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2em;
}

.mright {
  margin-right: 10px;
}

.dialogFont {
  font-size: 8px;
}

.dialogMsgTitle {
  width: 95%;
  height: 35px;
  font-weight: 700;
  line-height: 35px;
}
.dialogMsgBox li {
  margin-top: 10px;
}

.headerImg {
  height: 70px;
  width: 70px;
  background-color: rebeccapurple;
}

.dialogMsgBox .content {
  flex: 1;
  margin-left: 30px;
}

.dialogMsgBox .contentTile {
  font-size: 16px;
  border-radius: 10px;
}

.dialogMsgBox .msgContent {
  font-size: 14px;
  text-indent: 2em;
}
.dialogMsgBox .footer {
  margin-top: 10px;
  font-size: 5px;
  color: #a19a99;
  text-indent: 2em;
}
</style>
