<script setup lang="ts">
// 导入glide 模板， 需要改库的.d.ts文件
import Glide from '@glidejs/glide'
import { CaptionAnime, dataDynamicShow } from './animate'
import Isotope from 'isotope-layout'
import { onMounted } from 'vue'
import ScrollReveal from 'scrollreveal'
import SmoothScroll from 'smooth-scroll'

onMounted(() => {
  // 轮播
  SetGlide()
  const filterBtns = document.querySelector('.filter-btns')
  // 图片布局
  SetPhotoLayout(filterBtns)

  const headerEl: any = document.querySelector('.header')
  const ToTopEl: any = document.querySelector('.scrollToTop')
  const dataSectionEl: any = document.querySelector('.data-section')
  // 添加全局监听事件
  window.addEventListener('scroll', () => {
    // 导航出现
    FixedHeader(headerEl)
    ToTopScroll(ToTopEl)
    DataSectionBgChange(dataSectionEl)
  })

  SetScrollReveal(dataSectionEl)

  // 设置顺滑滚动效果
  SetSmoothScroll() 
  // 折叠导航
  FlodNav(headerEl)
  // 收起展开的导航
  PackUpNav(headerEl)
 
})

function SetGlide() {
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
}

// 照片的布局
function SetPhotoLayout(filterBtns: HTMLElement | any) {
  // 初始化 isotope
  const isotope = new Isotope('.cases', {
    layoutMode: 'masonry',
    itemSelector: '.case-item',
  })

  // 注册事件
  filterBtns.addEventListener('click', (e: { target: HTMLElement }) => {
    // 获取被clicked的按钮, (断言target是HTMLElement类型)
    let target = e.target
    // 获取 按钮的类别
    const filterOption = target.getAttribute('data-filter') as string
    if (filterOption) {
      document.querySelectorAll('.filter-btn.active').forEach((btn) => {
        // 移除激活状态
        btn.classList.remove('active')
      })
      target.classList.add('active')
    }
    isotope.arrange({
      filter: filterOption,
    })
  })
}

//
function SetScrollReveal(el:HTMLElement) {
  // scrollreveal通用属性
  const staggeringOption = {
    delay: 300,
    distance: '50px',
    duration: 500,
    easing: 'ease-in-out',
    origin: 'bottom',
  }
  // about-us feature显示效果
  ScrollReveal().reveal('.feature', { ...staggeringOption, interval: 350 })

  // 数据动态显示
  ScrollReveal().reveal('.data-section', {
    // 在显示完成时触发的函数
    beforeReveal: () => {
      // anime效果
      dataDynamicShow()
      el.style.backgroundPosition = `center calc(50% - ${el.getBoundingClientRect().bottom / 5}px`
    },
  })
}

// 导航的出现函数
function FixedHeader(headerEl: Element | any) {
  // 获取.header的高度
  let headerHeight = headerEl.getBoundingClientRect().height
  // 当下滑的height > 800时，添加sticky，固定导航显示
  if (window.pageYOffset - headerHeight > 420) {
    // 判断.header中是否含有sticky类名
    if (!headerEl.classList.contains('sticky')) {
      headerEl.classList.add('sticky')
    }
  } else {
    headerEl.classList.remove('sticky')
  }
}

// 回到顶部按钮
function ToTopScroll(ToTopEl: Element | any) {
  // console.log(ToTopEl)
  if (window.pageYOffset > 2000) {
    // 重新设置按钮的display 样式属性
    ToTopEl.style.display = 'block'
  } else {
    ToTopEl.style.display = 'none'
  }
}

// 数据显示区域的背景动态效果
function DataSectionBgChange(el: HTMLElement) {
  const bottom = el.getBoundingClientRect().bottom
  const top = el.getBoundingClientRect().top
  // 当
  if (bottom >= 0 && top < window.innerHeight) {
    el.style.backgroundPosition = `center calc(50% - ${el.getBoundingClientRect().bottom / 5}px`
  }
}

// 折叠按钮动态效果
function FlodNav(headerEl: HTMLElement) {
  const burgerEl: any = document.querySelector('.burger')
  burgerEl.addEventListener('click', () => {
    headerEl.classList.toggle('open')
  })
}

// 收起展开的导航
function PackUpNav(el: HTMLElement) {
  document.addEventListener('scrollStart', () => {
    if (el.classList.contains('open')) {
      el.classList.remove('open')
    }
  })
}

function SetSmoothScroll() {
  // 平滑滚动
  const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: '.header',
    offset: 80,
  })

  const exploreBtnEls = document.querySelectorAll('.explore-btn')

  exploreBtnEls.forEach((btnEl) => {
    btnEl.addEventListener('click', () => {
      scroll.animateScroll(document.querySelector('#about-us'))
    })
  })
}
</script>

<template>
  <!-- 页面标题头部header -->
  <div class="header">
    <div class="logo">Hinoki Office</div>
    <nav>
      <a href="#home">首页</a>
      <a href="#about-us">关于我们</a>
      <a href="#showcases">成功案例</a>
      <a href="#data-section">数据展示</a>
      <a href="#team-section">团队介绍</a>
      <a href="#trend-section">公司动态</a>
      <!-- search button -->
      <a href="#">
        <fa icon="search" class="fa"></fa>
      </a>
    </nav>

    <div class="burger">
      <!-- fast create: burger-line-$*3 -->
      <div class="burger-line-1"></div>
      <div class="burger-line-2"></div>
      <div class="burger-line-3"></div>
    </div>
  </div>

  <!-- 轮播图Swiper -->
  <div id="home" class="glide">
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
          <img src="./assets/img/swiper_pics/home_sw_bg_1.jpg" alt="" />
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

  <!-- 各内容区域 -->
  <div class="content-wrapper">
    <!-- 关于我们 -->
    <!-- 功能聚合 文档中的区段-->
    <section id="about-us" class="about-us">
      <h2 class="title1">关于我们</h2>
      <p class="intro">本网站学习实例，使用Vite2.0 + Vue3 + TS, 使用Glide、Anime、FontAwesome等静态库。</p>
      <!-- 各特征feature -->
      <div class="features">
        <div class="feature">
          <fa class="fa" icon="lightbulb" />
          <h4 class="feature-title">品牌创意</h4>
          <p class="feature-content">组件化、响应式</p>
        </div>

        <div class="feature">
          <fa class="fa" icon="chart-line" />
          <h4 class="feature-title">整合营销</h4>
          <p class="feature-content">市场分析、制定营销策略</p>
        </div>

        <div class="feature">
          <fa class="fa" icon="cart-shopping" />
          <h4 class="feature-title">电子商务</h4>
          <p class="feature-content">根据企业需求，开设不同销售渠道，通过网上直销</p>
        </div>

        <div class="feature">
          <fa class="fa" icon="desktop" />
          <h4 class="feature-title">网页设计</h4>
          <p class="feature-content">通过网站建设、智能建站、域名主机、企业邮箱</p>
        </div>

        <div class="feature">
          <fa class="fa" icon="gauge-simple" />
          <h4 class="feature-title">网站优化</h4>
          <p class="feature-content">网站推广，推送到各大知名网站和搜索引擎</p>
        </div>

        <div class="feature">
          <fa class="fa" icon="server" />
          <h4 class="feature-title">网站建设</h4>
          <p class="feature-content">通过绑定域名和服务器，将网站展现给全世界</p>
        </div>
        <!-- end features -->
      </div>
    </section>

    <!-- Photos -->
    <section id="showcases" class="showcases section-bg">
      <h2 class="title1">Photos</h2>
      <!-- 过滤按钮 -->
      <div class="filter-btns">
        <button class="filter-btn active" data-filter="*">全部</button>
        <button class="filter-btn" data-filter=".animal">动物</button>
        <button class="filter-btn" data-filter=".scenery">风景</button>
        <button class="filter-btn" data-filter=".character">人物</button>
      </div>
      <!-- 具体的案例 -->
      <div class="cases">
        <div class="case-item scenery">
          <img src="./assets/img/case_pics/blue_water_bg.jpg" alt="" />
        </div>

        <div class="case-item character">
          <img src="./assets/img/case_pics/bookshop_one_person.jpg" alt="" />
        </div>

        <div class="case-item scenery">
          <img src="./assets/img/case_pics/seaside.jpg" alt="" />
        </div>

        <div class="case-item scenery">
          <img src="./assets/img/case_pics/train_bridge_hole.jpg" alt="" />
        </div>

        <div class="case-item scenery">
          <img src="./assets/img/case_pics/sun_pole_field.jpg" alt="" />
        </div>

        <div class="case-item scenery">
          <img src="./assets/img/case_pics/tri_house.jpg" alt="" />
        </div>

        <div class="case-item scenery">
          <img src="./assets/img/case_pics/weight_cloud.jpg" alt="" />
        </div>

        <div class="case-item animal">
          <img src="./assets/img/case_pics/cat_sideby_rail.jpg" alt="" />
        </div>
      </div>
    </section>

    <!-- Team -->
    <section id="team-section" class="team-intro section-bg">
      <h2 class="title1">Team</h2>
      <div class="team-members">
        <div class="team-member">
          <div class="profile-image">
            <img src="./assets/img/members/m1.png" alt="" />
          </div>
          <h4 class="name">Yileina</h4>
          <ul class="social-links">
            <li>
              <a href=""><fa :icon="['fab', 'github']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'twitter']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weibo']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weixin']" /></a>
            </li>
          </ul>
        </div>

        <div class="team-member">
          <div class="profile-image">
            <img src="./assets/img/members/m2.jpg" alt="" />
          </div>
          <h4 class="name">Yuse</h4>
          <ul class="social-links">
            <li>
              <a href=""><fa :icon="['fab', 'github']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'twitter']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weibo']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weixin']" /></a>
            </li>
          </ul>
        </div>

        <div class="team-member">
          <div class="profile-image">
            <img src="./assets/img/members/m3.png" alt="" />
          </div>
          <h4 class="name">Fox</h4>
          <ul class="social-links">
            <li>
              <a href=""><fa :icon="['fab', 'github']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'twitter']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weibo']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weixin']" /></a>
            </li>
          </ul>
        </div>
        <div class="team-member">
          <div class="profile-image">
            <img src="./assets/img/members/m2.jpg" alt="" />
          </div>
          <h4 class="name">Yuse</h4>
          <ul class="social-links">
            <li>
              <a href=""><fa :icon="['fab', 'github']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'twitter']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weibo']" /></a>
            </li>
            <li>
              <a href=""><fa :icon="['fab', 'weixin']" /></a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 数据部分 -->
    <section id="data-section" class="data-section">
      <div class="data-piece">
        <fa icon="code" class="fa" />
        <div class="num">156</div>
        <div class="data-desc">行代码</div>
      </div>
      <div class="data-piece">
        <fa icon="images" class="fa" />
        <div class="num">156</div>
        <div class="data-desc">个插画</div>
      </div>
      <div class="data-piece">
        <fa icon="palette" class="fa" />
        <div class="num">156</div>
        <div class="data-desc">名画师</div>
      </div>
      <div class="data-piece">
        <fa icon="palette" class="fa" />
        <div class="num">156</div>
        <div class="data-desc">名画师</div>
      </div>
    </section>

    <!-- 动态部分 -->
    <section id="trend-section" class="trend-section">
      <div class="title1">Trend</div>
      <p class="intro">关注风格趋势</p>
      <div class="trends">
        <div class="trend">
          <div class="act-img-wrapper">
            <img src="./assets/img/case_pics/some_cloud.jpg" alt="" />
          </div>
          <div class="meta">
            <p class="date-published"><fa :icon="['far', 'calendar-days']" class="far" />2021年12月1日</p>
            <p class="comments"><fa :icon="['far', 'comments']" class="far" />33条评论</p>
          </div>
          <h2 class="act-title">Cloud and Sky</h2>
          <article>云与天，天与云，云亦天，天亦云，云中天，天中云，云云于天，沉于天。</article>
          <button class="readmore-btn">阅读更多</button>
        </div>

        <div class="trend">
          <div class="act-img-wrapper">
            <img src="./assets/img/case_pics/house_sky_reflection.jpg" alt="" />
          </div>
          <div class="meta">
            <p class="date-published"><fa :icon="['far', 'calendar-days']" class="far" />2021年12月1日</p>
            <p class="comments"><fa :icon="['far', 'comments']" class="far" />33条评论</p>
          </div>
          <h2 class="act-title">Cloud and Sky</h2>
          <article>云与天，天与云，云亦天，天亦云，云中天，天中云，云云于天，沉于天。</article>
          <button class="readmore-btn">阅读更多</button>
        </div>

        <div class="trend">
          <div class="act-img-wrapper">
            <img src="./assets/img/case_pics/road_snow_mountain.jpg" alt="" />
          </div>
          <div class="meta">
            <p class="date-published"><fa :icon="['far', 'calendar-days']" class="far" />2021年12月1日</p>
            <p class="comments"><fa :icon="['far', 'comments']" class="far" />33条评论</p>
          </div>
          <h2 class="act-title">Cloud and Sky</h2>
          <article>云与天，天与云，云亦天，天亦云，云中天，天中云，云云于天，沉于天。</article>
          <button class="readmore-btn">阅读更多</button>
        </div>

        <div class="trend">
          <div class="act-img-wrapper">
            <img src="./assets/img/case_pics/purple_sky.jpg" alt="" />
          </div>
          <div class="meta">
            <p class="date-published"><fa :icon="['far', 'calendar-days']" class="far" />2021年12月1日</p>
            <p class="comments"><fa :icon="['far', 'comments']" class="far" />33条评论</p>
          </div>
          <h2 class="act-title">Cloud and Sky</h2>
          <article>云与天，天与云，云亦天，天亦云，云中天，天中云，云云于天，沉于天。</article>
          <button class="readmore-btn">阅读更多</button>
        </div>
      </div>
    </section>
  </div>

  <footer>
    <div class="footer-menus">
      <div class="contact-us">
        <p class="menu-title">联系我们</p>
        <p>Location: SuZhou</p>
        <p>Tel: 620000</p>
        <p>E-mali: Hinoki@office.com</p>
      </div>

      <div class="sevice-menu footer-menu">
        <p class="menu-title">Service</p>
        <ul class="menu-items">
          <li><a href="#">Search</a></li>
          <li><a href="#">Find</a></li>
          <li><a href="#">Design</a></li>
        </ul>
      </div>

      <div class="sevice-menu footer-menu">
        <p class="menu-title">Photos</p>
        <ul class="menu-items">
          <li><a href="#">Character</a></li>
          <li><a href="#">Animal</a></li>
          <li><a href="#">Scenery</a></li>
        </ul>
      </div>

      <div class="sevice-menu footer-menu">
        <p class="menu-title">Trend</p>
        <ul class="menu-items">
          <li><a href="#">CurrentInfo</a></li>
          <li><a href="#">Recent</a></li>
          <li><a href="#">News</a></li>
        </ul>
      </div>

      <div class="sevice-menu footer-menu">
        <p class="menu-title">Photos</p>
        <ul class="menu-items">
          <li><a href="#">Character</a></li>
          <li><a href="#">Animal</a></li>
          <li><a href="#">Scenery</a></li>
        </ul>
      </div>

      <p class="icp-info">苏ICP备 1234567</p>
      <p class="rights">&copy; 2021 Hinoki Office - Hinoki Co.,Ltd 版权所有</p>
    </div>
    <div class="scrollToTop">
      <a href="#home"><fa icon="chevron-up" /></a>
    </div>
  </footer>
</template>

<style>
/* import global css */
@import url('./assets/css/global.css');
/* 导入glide css */
@import '@glidejs/glide/dist/css/glide.core.min.css';
@import '@glidejs/glide/dist/css/glide.theme.min.css';

/*            #region 头部               */
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

.header.sticky {
  position: fixed;
  background-color: white;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  /* ease-in-out 开始和结束过渡效果较慢，中间匀速 */
  /* forwards 在animation结束时，保存其最后一帧, 是animation-fill-mode的一个属性值 */
  animation: dropDown 0.5s ease-in-out forwards;
}

.header.sticky .logo,
.header.sticky nav a,
.header.sticky nav i {
  color: var(--text-color-dark);
}

/* header 下滑的动态效果 */
@keyframes dropDown {
  from {
    transform: translateY(-100px);
  }

  /* 去 */
  to {
    transform: translateY(0);
  }
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

.explore-btn {
  padding: 14px 32px;
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  color: var(--text-color-lightest);
  font-size: 30px;
  cursor: pointer;
}
/* #endregion 头部区域结束*/

/*              #region 轮播            */
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
/* #endregion 轮播区域结束 */

/*          #region 内容区域————通用样式         */
.content-wrapper {
  display: flex;
  align-items: center;
  /* flex是一维布局， 所以只有一个content */
  justify-content: center;
  /* 按列布局 */
  flex-direction: column;
}

/* 各区域的 内容 */
section {
  display: grid;
  /* grid是二维，有很多列，对于每一个列的 水平上的居中方式, 与flex布局不同 */
  justify-items: center;
  max-width: 1180px;
  padding: 0 80px;
}

/* 各区域的 标题 */
.title1 {
  font-size: 34px;
  color: var(--text-color-darker);
}

/* 各内容区域的 背景 */
.section-bg {
  position: relative;
}
/* 各内容区域的 标题下方的分隔线 */
.section-bg::before {
  content: '';
  display: block;
  position: absolute;
  background-color: #f9fbfb;
  width: 100vw;
  height: 100%;
  /* 置于最底层 */
  z-index: -1;
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
/* #endregion 通用样式结束 */

/*               #region 关于我们                  */
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
    'icon title'
    'icon content';
  /* 定义每个列的宽度, 60px图标的宽度， 1fr是剩余的给title/content */
  grid-template-columns: 60px 1fr;
  /* 标题占1/4, 内容占3/4 */
  grid-template-rows: 1fr 3fr;
}

.feature svg {
  grid-area: icon;
  font-size: 34px;
  color: var(--primary-color);
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
/* #endregion 关于我们区域结束 */

/*              #region Photos区域                */
.showcases {
  /* 还原最大宽度 */
  max-width: unset;
  padding: 0;
  padding-top: 72px;
}

.filter-btns {
  margin-top: 54px;
  margin-bottom: 38px;
}

.filter-btn {
  margin: 0 7px;
  background-color: var(--secondary-color);
  border: 0;
  color: var(--text-color-dark-gray);
  padding: 8px 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.4s;
}

/* btn被选中时， btn被点击(激活)时的样式，(使用tab可以测试) */
.filter-btn:focus,
.filter-btn:active {
  /* 取消轮廓 */
  outline: none;
}

/* btn激活和鼠标悬浮 */
.filter-btn.active,
.filter-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.showcases .cases {
  width: 100vw;
}

.showcases .case-item {
  width: 25vw;
  /* 使用vw， 保持宽高比一致 */
  height: 20vw;
  /* img超出的部分不可见 */
  overflow: hidden;
}

.case-item img {
  height: 100%;
  /* 等比例缩放 */
  object-fit: cover;
}
/* #endregion Photos区域 */

/*                 #region  Team介绍区域         */
.team-intro {
  margin-top: 48px;
  padding-top: 62px;
  padding-bottom: 52px;
}
/* members 容器 */
.team-members {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 36px;
  margin-top: 86px;
}

/* member */
.team-member {
  background-color: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding-bottom: 28px;
  transition: 0.4s;

  /* 栅格布局 */
  display: grid;
}

.profile-image {
  overflow: hidden;
}

.profile-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  /* 图片顶部与内容框齐平，并居中， 超出部分隐藏掉 x:center, y: top */
  object-position: center top;
}

.team-member .name {
  margin-top: 18px;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color-dark);
  padding-bottom: 10px;
}
.social-links {
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  padding: 0 46px;
}

.social-links li {
  list-style: none;
}

.social-links a {
  color: var(--text-color-dark);
  text-decoration: none;
}

.team-member:hover {
  transform: translateY(-20px) scale(1.05);
  box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
}
/* #endregion  Team结束区域 */

/*        #region 数据展示区域开始          */
.data-section {
  max-width: unset;
  width: 100vw;
  height: 255px;
  background-image: url('./assets/img/case_pics/sunset_telephone_Pole.jpg');
  /* 背景等比例缩放 */
  background-size: cover;
  background-position: center;

  display: grid;
  /* minmax()  auto是最小值， 220px是最大值吗最大不能超过220px */
  grid-template-columns: repeat(4, minmax(auto, 220px));
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
}

/* 遮罩 */
.data-section::before {
  content: '';
  display: block;
  position: absolute;
  background-color: var(--backdrop-color);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.data-piece {
  width: 250px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  color: white;
  position: relative;
  z-index: 2;
}

.data-piece .fa {
  font-size: 40px;
}

.data-piece .num {
  margin-top: 7px;
  font-size: 38px;
  font-weight: 600;
}

.data-piece .data-desc {
  margin-top: 2px;
  font-size: 18px;
  font-weight: 500;
}
/* #endregion 数据展示区域结束 */

/* #region Trend 展示区域 */
.trend-section {
  margin-top: 80px;
}

.trends {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
}

.trend {
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: 0.4s;
}

.act-img-wrapper {
  height: 255px;
  overflow: hidden;
  /* 将padding填充的24px 抵消掉 */
  margin: -24px;
  margin-bottom: 0px;
}

.act-img-wrapper img {
  min-height: 300px;
  object-fit: cover;
}

.trend .meta {
  margin-top: 20px;
  margin-bottom: 12px;
  color: var(--text-color-light-gray);

  display: flex;
}

.trend .meta .far {
  margin-right: 4px;
}

.trend .meta p {
  font-size: 12px;
}

/* >直接元素,第一层， :last-child最后一个子元素 */
.trend .meta > p:last-child {
  margin-left: 36px;
}

.act-title {
  color: var(--text-color-dark);
  font: size 18px;
  margin: 10px 0;
}

.trend article {
  color: var(--text-color-gray);
  letter-spacing: 0.5px;
  line-height: 24px;
}

.readmore-btn {
  border: 0;
  color: white;
  background-color: var(--primary-color);
  border-radius: 4px;
  padding: 6px 14px;
  margin-top: 14px;
}

.trend:hover {
  transform: translateY(-20px) scale(1.05);
  box-shadow: 0 0 36px rgba(0, 0, 0, 0.1);
}

/* #endregion Trend 展示区域结束 */

/*        #region  footer区域开始         */
/* 底部信息 */
footer {
  margin-top: 120px;
  background-color: #181818;
  display: grid;
  justify-items: center;
  padding-top: 40px;
  padding-bottom: 16px;
}

.footer-menus {
  width: 100%;
  max-width: 1180px;
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  padding: 0 40px;
  position: relative;
}

.menu-title {
  font-size: 16px;
  color: white;
  font-weight: 500;
  margin-bottom: 20px;
}

.contact-us {
  justify-self: start;
  color: var(--text-color-lightest);
}

/* 选中的p不是第一个 */
.contact-us p:not(:first-child) {
  padding-bottom: 16px;
}

.menu-items li {
  list-style: none;
  padding-bottom: 8px;
}

.menu-items li a {
  text-decoration: none;
  font-weight: 300;
  color: var(--text-color-lightest);
}

.icp-info {
  margin-top: 20px;
  margin-bottom: 10px;
}

.icp-info,
.rights {
  /* 第一条分割线， -1最后一条分割线 */
  grid-column: 1 / -1;
  justify-self: center;
  color: white;
}

/* #endregion  footer结束区域 */

.scrollToTop {
  display: none;
  position: relative;
  /* 设置z-index必须设置position */
  z-index: 300;
}
/* 返回顶部按钮 */
.scrollToTop a {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;

  text-decoration: none;
  /* 漂浮 */
  position: fixed;
  bottom: 60px;
  right: 30px;
}

/* #region 响应式 */

@media (max-width: 1100px) {
  .header nav {
    display: none;
  }

  .header {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 折叠导航burger */
  .header .burger {
    display: block;
    width: 20px;
    height: 6px;
    position: relative;
    justify-self: end;
    cursor: pointer;
  }

  .burger-line-1,
  .burger-line-2,
  .burger-line-3 {
    width: 20px;
    height: 2px;
    background-color: var(--text-color-lightest);
  }

  .burger-line-1 {
    position: absolute;
    top: -5px;
  }

  .burger-line-3 {
    position: absolute;
    top: 5px;
  }

  /* open */
  .header.open nav {
    display: grid;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    /* 设置行轨道 取 内容的最大值的宽度 */
    grid-auto-rows: max-content;
    justify-items: end;

    padding: 0 40px;

    opacity: 0;
    /* anime */
    animation: slideDown 0.6s ease-out forwards;
  }

  .header.open nav > * {
    color: var(--text-color-darker);
    animation: showMenu 0.5s linear forwards 0.4s;

    font-size: 18px;
    margin: 4px 0;
    opacity: 0;
  }

  .header.open nav > a .fa {
    margin-top: 8px;
  }

  /* 折叠按钮的三条线 */

  .header.open .burger-line-1,
  .header.open .burger-line-2,
  .header.open .burger-line-3,
  .header.sticky .burger-line-1,
  .header.sticky .burger-line-2,
  .header.sticky .burger-line-3 {
    background-color: var(--text-color-darker);
    /* 折叠动画 */
    transition: 0.4s ease;
  }

  .header.open .burger-line-1 {
    /* 转动45度，正数是一个从左到右旋转 */
    transform: rotate(45deg) translate(2px, 5px);
  }

  .header.open .burger-line-2 {
    transform: translateX(5px);
    opacity: 0;
  }

  .header.open .burger-line-3 {
    transform: rotate(-45deg) translate(2px, -5px);
  }

  /* logo呈现出来 */
  .header.open .logo {
    position: relative;
    z-index: 40;
    color: var(--text-color-darker);
  }

  /* 定义动画 */
  /* 导航 */
  @keyframes slideDown {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: 100vh;
      padding-top: 80px;
      opacity: 1;
    }
  }
  /* 菜单 */
  @keyframes showMenu {
    from {
      opacity: 0;
      transform: translateY(-1vh);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@media (max-width: 992px) {
  section {
    padding: 0 60px;
  }

  .slide-caption h1 {
    font-size: 48px;
  }

  .slide-caption h3 {
    font-size: 20px;
  }

  .slide-caption .explore-btn {
    font-size: 24px;
    padding: 8px 28px;
  }

  .about-us .features {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: unset;
  }

  .showcases .case-item {
    width: calc(100vw / 3);
  }

  .team-members {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 36px;
  }

  .data-section {
    grid-template-columns: repeat(2, minmax(200px, auto));
    padding: 24px 0;
    height: auto;
    row-gap: 24px;
    background-size: 200%;
  }

  .trend-section .trends {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 36px;
    column-gap: 20px;
  }

  .footer-menus .contact-us {
    justify-self: left;
    text-align: left;
  }
}

@media (max-width: 768px) {
  .showcases .case-item {
    width: calc(100vw / 2);
    height: 30vw;
  }
  section,
  .footer-menus {
    padding: 0 40px;
  }

  .footer-menus {
    grid-template-columns: 2fr repeat(2, 1fr);
    row-gap: 24px;

    text-align: right;
  }

  .contact-us {
    grid-row: 1 / 3;
  }
}

@media (max-width: 576px) {
  .slide-caption h1 {
    font-size: 38px;
  }

  .slide-caption h3 {
    font-size: 16px;
  }

  .slide-caption .explore-btn {
    padding: 8px 20px;
    font-size: 20px;
  }

  .about-us .features {
    grid-template-columns: 1fr;
  }

  .showcases .case-item {
    width: 100vw;
    height: 56vw;
  }

  .team-members {
    grid-template-columns: minmax(200px, 400px);
  }

  .data-section {
    grid-template-columns: 1fr;
    background-size: 400%;
  }

  .trend-section .trends {
    grid-template-columns: 1fr;
  }

  .footer-menus {
    grid-template-columns: 1fr;
  }

  .footer-menu {
    justify-self: left;
    text-align: left;
  }
}

@media (max-width: 367px) {
  .data-section {
    background-size: 800%;
  }
}

@media (max-width: 180px) {
  .data-section {
    background-size: 1200%;
  }
}
</style>
