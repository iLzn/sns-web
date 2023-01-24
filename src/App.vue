<template>
  <div id="app">
    <!-- <el-container>
      <el-aside width="150px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>@ReuleauxSns</el-footer>
      </el-container>
    </el-container> -->
    <topicMsg />
  </div>
</template>

<script>
import topicMsg from "./components/msgTips/topicMsg";

export default {
  name: "App",
  components: {
    topicMsg,
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
