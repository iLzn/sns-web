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
          在<el-link type="primary">xxx</el-link>话题
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
                <div class="contentTile">
                  <span class="unick">{{ dialogMsg.unick }}</span> 回复:
                </div>
                <!-- 主内容 -->
                <div class="msgContent">{{ dialogMsg.msgContent }}</div>
                <!-- 内容尾 -->
                <div class="footer">{{ dialogMsg.publishDate }}</div>
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
          <button
            class="pianoButton big-button mright dialogFont"
            @click="handleDialogMsgisRead"
          >
            已读
          </button>
          <button
            class="pianoButton big-button dialogFont"
            @click="handleReply"
          >
            回复
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "topicMsgDialog",
  props: [
    "dialogMsgVisible",
    "dialogChange",
    "diaglogId",
    "handleMsgisRead",
    "dialogMsg",
    "userUuid",
  ],
  data() {
    return {
      textarea: "",
      dialogVisible: this.dialogMsgVisible,
    };
  },
  computed: {},
  methods: {
    //设置消息已读
    handleDialogMsgisRead() {
      this.handleMsgisRead(this.diaglogId);
      this.dialogVisible = false;
    },

    //回复消息
    handleReply() {
      axios
        .get("http://localhost:8080/SNS/insertTopicMsg.do", {
          params: {
            topicUuid: this.dialogMsg.topicUuid,
            msgContent: this.textarea,
            userUuid: this.dialogMsg.publisherUuid,
            publisherUuid: this.userUuid,
          },
        })
        .then(
          (response) => {
            if (response.data == "success") {
              this.$notify({
                message: "消息已回复~",
                type: "success",
              });
              this.handleDialogMsgisRead();
              this.dialogVisible = false;
            }
          },
          (error) => {
            alert(error.message + "服务器可能挂了，反正出错了");
          }
        );
    },
  },
  mounted() {},
  watch: {
    // 监视对话框可视化
    dialogMsgVisible() {
      this.dialogVisible = this.dialogMsgVisible;
    },
  },
};
</script>

<style scoped>
@import "../../style/css/msgButton.css";
.bk {
  border: 1px solid black;
}
.unick {
  color: blue;
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
