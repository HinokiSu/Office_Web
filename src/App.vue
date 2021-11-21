<script setup lang="ts">
// 导入glide 模板， 需要改库的.d.ts文件
import Glide from '@glidejs/glide'
import { CaptionAnime } from './animate'

import { onMounted } from 'vue'

onMounted(() => {
  // 初始化glide
  const glide: any = new Glide('.glide')

  const captionEl = document.querySelectorAll('.slide-caption')
  //
  glide.on(['mount.after', 'run.after'], () => {
    // 获取当前滑块的结点
    const caption = captionEl[glide.index]
    // 标题的动画
    CaptionAnime(caption.children)
  })
  // 挂在glide
  glide.mount()
})
</script>

<template>
  <!-- 页面标题头部header -->
  <div class="header">
    <div class="logo">Hinoki Office</div>
    <nav>
      <a href="#">首页</a>
      <a href="#">关于我们</a>
      <a href="#">成功案例</a>
      <a href="#">服务流程</a>
      <a href="#">团队介绍</a>
      <a href="#">公司动态</a>
      <!-- search button -->
      <a href="#">
        <font-awesome-icon icon="search"></font-awesome-icon>
      </a>
    </nav>
  </div>

  <div class="burger">
    <!-- fast create: burger-line-$*3 -->
    <div class="burger-line-1"></div>
    <div class="burger-line-2"></div>
    <div class="burger-line-3"></div>
  </div>

  <!-- 轮播图Swiper -->
  <div class="glide">
    <div class="glide__track" data-glide-el="track">
      <!-- 滑块容器 -->
      <div class="glide__slides">
        <!-- 第一个滑块 -->
        <div class="glide__slide">
          <!-- 滑块的标题 -->
          <div class="slide-caption">
            <h1>云与天与世间</h1>
            <h3>云与天的融合，映射在水稻田里，路过的农耕机穿梭其中。</h3>
            <button class="explore-btn">探索更多</button>
            <!-- 图片的遮罩层， 使得文字更加清晰 -->
          </div>
          <div class="backdrop"></div>
          <img src="./assets/img/home_sw_bg_1.jpg" alt="" />
        </div>

        <!-- 第二个滑块 -->
        <div class="glide__slide">
          <!-- 滑块的标题 -->
          <div class="slide-caption left">
            <h1>车与人</h1>
            <h3>火车穿梭而过，人们在栏杆外等待，等待旅人的离开。</h3>
            <button class="explore-btn">探索更多</button>
          </div>
          <!-- 图片的蒙版， 使得文字更加清晰 -->
          <div class="backdrop"></div>
          <video src="./assets/video/home_sw_video.mp4" muted autoplay loop></video>
        </div>
      </div>
    </div>

    <!-- 两侧切换箭头 -->
    <div class="glide__arrows" data-glide-el="controls">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&lt;</button>

      <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&gt;</button>
      <div class="glide__bullets" data-glide-el="controls[nav]">
        <button class="glide__bullet" data-glide-dir="=0"></button>
        <button class="glide__bullet" data-glide-dir="=1"></button>
      </div>
    </div>
  </div>

  <!-- 关于我们 -->
  <div class="content-wrapper">
    <!-- 功能聚合 文档中的区段-->
    <section class="about-us">
      <h2 class="title1">关于我们</h2>
      <p class="intro">本网站学习实例，使用Vite2.0 + Vue3 + TS, 使用Glide、Anime、FontAwesome等静态库。</p>
      <!-- 各特征feature -->
      <div class="features">
        <div class="feature">
          <font-awesome-icon class="fa" icon="lightbulb" />
          <h4 class="feature-title">品牌创意</h4>
          <p class="feature-content">组件化、响应式</p>
        </div>

        <div class="feature">
          <font-awesome-icon class="fa" icon="chart-line" />
          <h4 class="feature-title">整合营销</h4>
          <p class="feature-content">市场分析、制定营销策略</p>
        </div>

        <div class="feature">
          <font-awesome-icon class="fa" icon="cart-shopping" />
          <h4 class="feature-title">电子商务</h4>
          <p class="feature-content">根据企业需求，开设不同销售渠道，通过网上直销</p>
        </div>

        <div class="feature">
          <font-awesome-icon class="fa" icon="desktop" />
          <h4 class="feature-title">网页设计</h4>
          <p class="feature-content">通过网站建设、智能建站、域名主机、企业邮箱</p>
        </div>

        <div class="feature">
          <font-awesome-icon class="fa" icon="gauge-simple" />
          <h4 class="feature-title">网站优化</h4>
          <p class="feature-content">网站推广，推送到各大知名网站和搜索引擎</p>
        </div>

        <div class="feature">
          <font-awesome-icon class="fa" icon="server" />
          <h4 class="feature-title">网站建设</h4>
          <p class="feature-content">通过绑定域名和服务器，将网站展现给全世界</p>
        </div>
      <!-- end features -->
      </div>

    </section>
  </div>
</template>

<style>
/* import global css */
@import url('./assets/css/global.css');
/* 导入glide css */
@import '@glidejs/glide/dist/css/glide.core.min.css';
@import '@glidejs/glide/dist/css/glide.theme.min.css';



/* 头部 */
.header {
  width: 100vw;
  height: 80px;

  display: grid;
  padding: 0 40px;
  /* 设置布局 */
  grid-template-columns: 1fr 2fr;
  align-items: center;
  position: relative;
  z-index: 200;
}

.logo {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color-lightest);
}

.header nav {
  /* 主轴上的最后 */
  justify-self: end;
}

.header nav i {
  color: var(--text-color-lightest);
}

.header nav a {
  color: var(--text-color-lightest);
  /* 去除下划线 */
  text-decoration: none;
  margin: 0 24px;
}

.header.burger {
  display: none;
}

/* 轮播 */
.glide {
  position: relative;
  top: -80px;
  z-index: 50;
}

.glide__slide img,
.glide__slide video {
  width: 100vw;
  height: 100vh;
  /* 等比例缩放 */
  object-fit: cover;
}

/* 轮播标题 */
.slide-caption {
  position: absolute;
  z-index: 70;
  color: var(--text-color-lightest);
  text-align: center;
  max-width: 60vw;
}

.glide__slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-caption h1 {
  font-size: 54px;
  font-weight: 600;
}

.slide-caption h3 {
  font-size: 24px;
  margin: 48px 0;
}

.slide-caption.left {
  max-height: 80%;
  text-align: left;
}
/* 选取该元素的直接的子元素， 子元素嵌套的不包含在内 */
.slide-caption > * {
  opacity: 0;
}

/* 背景遮罩 */
.backdrop {
  background: var(--backdrop-color);
  z-index: 60;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  left: 0;
  right: 0;
}

.explore-btn {
  padding: 14px 32px;
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  color: var(--text-color-lightest);
  font-size: 30px;
  cursor: pointer;
}

/* 内容区域 */
/* 通用样式 */
.content-wrapper {
  display: flex;
  align-items: center;
  /* flex是一维布局， 所以只有一个content */
  justify-content: center;
}

section {
  display: grid;
  /* grid是二维，有很多列，对于每一个列的 水平上的居中方式, 与flex布局不同 */
  justify-items: center;
  max-width: 1180px;
  padding: 0 80px;
}

/* 内容标题 */
.title1 {
  font-size: 34px;
  color: var(--text-color-darker);
}

/* 在.title1元素后 插入新内容 */
.title1::after {
  content: '';
  display: block;
  width: 80%;
  height: 4px;
  background-color: var(--primary-color);
  margin-top: 14px;
  transform: translateX(10%);
}

.intro {
  margin: 28px 0 60px 0;
  font-size: 18px;
  color: var(--text-color-dark-gray);
}

/* 关于我们 */
.about-us {
  padding-bottom: 32px;
}

.features {
  display: grid;
  /* grid列的维度， 列数及宽度 */
  /* repeat(), 重复次数3,  重复的值 1fr, 相当于: 1fr 1fr 1fr */
  grid-template-columns: repeat(3, 1fr);
  /* 行 */
  grid-template-rows: 126px 126px;
  /* 列与列的 空隙 */
  column-gap: 5vw;
}

.feature {
  display: grid;
  /*  定位, 模板自定义名字，*/
  /* 自定义行的名字， 下面定义了 2行， 下面名字可以直接引用 */
  grid-template-areas: 
    "icon title"
    "icon content";
    /* 定义每个列的宽度, 60px图标的宽度， 1fr是剩余的给title/content */
    grid-template-columns: 60px 1fr;
    /* 标题占1/4, 内容占3/4 */
    grid-template-rows: 1fr 3fr;
}

.feature svg {
  grid-area: icon;
  font-size: 34px;
  color: var(--primary-color)
}

.feature-title {
  grid-area: title;
  font-size: 18px;
  color: var(--text-color-darker);
}

.feature-content {
  grid-area: content;
  color: var(--text-color-dark-gray);
}
</style>
