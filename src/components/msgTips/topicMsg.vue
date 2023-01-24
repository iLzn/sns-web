<template>
  <div ref="msg" class="msgbox">
    <!-- 对话框 -->
    <topicMsgDialog
      :dialogMsgVisible="dialogMsgVisible"
      :dialogChange="dialogChange"
      :topicMsg="topicMsg"
      :diaglogId="diaglogId"
    />
    <!-- 数据请求状态提示 -->
    <div v-show="isLoading">加载中！</div>
    <!-- 消息展示 -->
    <div class="msgContainer" v-show="!isLoading">
      <ul>
        <li v-for="msg in topicMsg" :key="msg.id" class="cyanli">
          <!-- 头像 -->
          <div class="headerImg">
            <el-avatar
              shape="square"
              :src="userHeaderImg"
              alt="图片挂了"
              :size="70"
            ></el-avatar>
          </div>
          <div class="msgContent">
            <!-- 选择框 -->
            <div class="checked">
              <el-checkbox v-model="topicMsgIdArry" :label="msg.id"
                >&nbsp;</el-checkbox
              >
            </div>
            <span style="color: blue">{{ msg.unick }} </span>评论了 您的话题:<br />
            <!-- 消息内容 -->
            <div class="content">
              <a @click="showDialog(msg.id)"> {{ msg.msgContent }}</a>
            </div>
            <!-- 消息日期 -->
            <div class="publishDate">{{ msg.publishDate }}</div>
            <!-- 消息框右侧图标-->
            <div class="button">
              <el-tooltip
                class="item"
                effect="dark"
                content="回复"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  circle
                  @click.native="showDialog(msg.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="已读"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-check"
                  circle
                  @click="handleMsgisRead(msg.id)"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部按钮和分页 -->
    <div class="msgBottom flex" v-show="topicMsg.length != 0">
      <div class="paginationBox">
        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next"
          background
          :page-size="pageSize"
          :total="topicMsgCount"
          :pager-count="5"
          :hide-on-single-page="paginationNumber == 1"
          @current-change="handleCurrentChange"
          next-text="下一页"
          prev-text="上一页"
        >
        </el-pagination>
      </div>
      <!-- 按钮 -->
      <div class="buttons flex flex1">
        <button
          class="pianoButton big-button"
          @click="handleMsgisRead(topicMsgIdArry)"
        >
          一键已读
        </button>
        <button class="pianoButton big-button" @click="handleCheckedAllMsg">
          全选
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import testImg from "../../assets/img/userHeader/testImg.jpg";
import axios from "axios";
import topicMsgDialog from "./topicMsgDialog";
import qs from "qs";

export default {
  name: "topicMsg",
  components: {
    topicMsgDialog,
  },
  data() {
    return {
      //加载中
      isLoading: true,
      //checkbox选中id
      topicMsgIdArry: [],
      userHeaderImg: testImg,
      // 消息对象
      topicMsg: [],
      // 对话框是否可视
      dialogMsgVisible: false,
      // 对话框id
      diaglogId: "",
      // 用户id
      userUuid: "5c173b3312794537af02bf0237349df1",
      // 数据总数
      topicMsgCount: 0,
      // 展示数据条数
      pageSize: 5,
      //当前页
      pageNum: 1,
    };
  },
  computed: {
    // 分页按钮页数
    paginationNumber() {
      return Math.ceil(this.topicMsgCount / this.pageSize);
    },
  },
  methods: {
    // 分页换页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getTopicMsg(this.userUuid, pageNum);
    },
    // 指定页数,单页数量,获取话题消息
    getTopicMsg(userUuid, pageNum, pageSize = this.pageSize) {
      axios
        .get("http://localhost:8080/SNS/getTopicMsg.do", {
          params: {
            userUuid,
            pageNum,
            pageSize,
          },
        })
        .then(
          (response) => {
            this.topicMsg = response.data;
            //修改加载状态
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = true;
            console.log(error.message + "服务器可能挂了，反正出错了");
          }
        );
      // 清空多选框
      this.topicMsgIdArry = [];
      //获取未读消息总数
      this.getTopicMsgCount(this.userUuid);
    },
    // 获取话题总数
    getTopicMsgCount(userUuid) {
      axios
        .get("http://localhost:8080/SNS/getTopicMsgCount.do", {
          params: {
            userUuid,
          },
        })
        .then(
          (response) => {
            this.topicMsgCount = response.data;
          },
          () => {}
        );
    },
    // 控制对话框显示
    showDialog(id) {
      this.diaglogId = id;
      this.dialogMsgVisible = true;
    },
    // 回调函数 控制对话框关闭
    dialogChange() {
      this.dialogMsgVisible = false;
    },

    // 控制是否全选
    handleCheckedAllMsg() {
      if (this.topicMsgIdArry.length == this.topicMsg.length) {
        this.topicMsgIdArry = [];
      } else {
        this.topicMsgIdArry = [];
        this.topicMsg.forEach((topicMsg) => {
          this.topicMsgIdArry.push(topicMsg.id);
        });
      }
    },

    //设置消息状态为已查阅
    handleMsgisRead(topicMsgId) {
      let topicMsgIdArry = [];
      //判断topicMsgId是数组还是字符串
      if (topicMsgId instanceof Array) {
        topicMsgIdArry = topicMsgId;
      } else {
        topicMsgIdArry.unshift(topicMsgId);
      }
      // topicMsgIdArry = qs.parse(topicMsgIdArry);
      if (topicMsgIdArry.length == 0) {
        this.$message({
          message: "您没有选中消息嗷~",
          type: "warning",
        });
        return;
      }
      // 处理url参数
      let topicMsgIdArrys = qs.stringify(
        { topicMsgIdArrys: topicMsgIdArry },
        { arrayFormat: "repeat" }
      );
      axios
        .get(
          "http://localhost:8080/SNS/updateTopicMsgReadState.do?" +
            topicMsgIdArrys
        )
        .then(
          () => {
            // 换页判断 若当前页为最后一页且 无数据 那么应该向前翻一页
            // this.topicMsgCount % this.pageSize == 1  此时数据总数未变 故最后一页最后一条数据执行时余为1
            if (
              (this.topicMsgCount % this.pageSize == 1 &&
                this.pageNum == this.paginationNumber) ||
              (this.pageNum == this.paginationNumber &&
                topicMsgIdArry.length == this.pageSize)
            ) {
              this.pageNum -= 1;
            }
            this.getTopicMsg(this.userUuid, this.pageNum);
          },
          (error) => {
            alert(error.message);
          }
        );
    },
  },
  // 组件初始化执行的钩子
  mounted() {
    this.getTopicMsg(this.userUuid, 1);
  },
};
</script>

<style  scoped>
/* 分页 */
@import "../../style/css/pagination.css";
/* 底部按钮 */
@import "../../style/css/msgButton.css";
.msgbox {
  margin: 0 auto;
  width: 900px;
}

/* 信息展示盒 */
.msgbox .msgContainer .cyanli {
  height: 90px;
  background-color: rgb(205, 255, 232);
  border-radius: 8px;
  border-bottom: 1px dashed green;
}

.msgbox .msgContainer .cyanli:hover {
  background-color: rgba(205, 255, 232, 0.767);
}

.headerImg {
  height: 70px;
  width: 70px;
  background-color: rebeccapurple;
  margin-left: 10px;
  margin-top: 10px;
  float: left;
}

.msgContent {
  margin-top: 5px;
  margin-left: 10px;
  float: left;
  height: 80px;
  width: 800px;
}
.msgContent .checked {
  float: left;
  width: 20px;
  height: 100%;
}

.msgContent .content {
  margin-top: 10px;
  width: 630px;
  height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.msgContent .publishDate {
  float: left;
  font-size: 13px;
  color: #a19a99;
  margin-top: 10px;
}

.msgContent .button {
  float: right;
  margin-right: 20px;
}

.flex {
  display: flex;
}

.flex1 {
  flex: 1;
}
.msgBottom {
  margin: 0 auto;
  margin-top: 30px;
}

.msgBottom .buttons {
  justify-content: flex-end;
}

.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 8px;
  background-color: rgb(205, 255, 232);
  border: 2px solid rgb(106, 163, 137);
}

::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev,
::v-deep .el-pagination.is-background .el-pager li {
  height: 50px;
  width: 50px;
  line-height: 50px;
  border-radius: 8px;
  background-color: rgb(205, 255, 232);
  border: 2px solid rgb(106, 163, 137);
}

::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev {
  width: 60px;
  font-weight: 700;
  color: rgb(106, 163, 137);
}

::v-deep .el-pagination span:not([class*="suffix"]) {
  display: inline-block;
  height: 100%;
  line-height: 50px;
  vertical-align: top;
  box-sizing: border-box;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #409eff;
  color: #fff;
}
</style>

