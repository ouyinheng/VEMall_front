<template>
  <div class="error500">
    <div class="error500-body-con">
      <el-card class="box-card">
        <div class="error500-body-con-title">5
          <span>0</span>0</div>
        <p class="error500-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
        <div class="error500-btn-con">
          <el-button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</el-button>
          <el-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error500",
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style scoped>
@keyframes error500animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.error500-body-con {
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.error500-body-con-title {
    text-align: center;
    font-size: 240px;
    font-weight: 700;
    color: #2d8cf0;
    height: 260px;
    line-height: 260px;
    margin-top: 40px;
}
.error500-body-con .error500-body-con-title span {
    display: inline-block;
    color: #19be6b;
    font-size: 230px;
    animation: error500animation 3s ease 0s infinite alternate;
}
.error500-body-con-message{
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 12px;
    color: #dddde2;
}
.error500--btn-con {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
}
</style>