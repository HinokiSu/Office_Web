/* 自定义Anime */

import anime from 'animejs'
import { EALREADY } from 'constants'

// 标题 caption 显示的Anime
export function CaptionAnime(element: any) {
  anime({
    targets: element,
    opacity: [0, 1],
    // 动画执行时间
    duration: 400,
    // anime执行函数 "线性的"
    easing: 'linear',
    // 为targets 添加stagger交错, 第一个出现先等待300ms, 后面的以400ms再出现
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  })
}

// 数据动态展示anime
export function dataDynamicShow() {
  anime({
    targets: '.data-piece .num',
    innerHTML: (el: { innerHTML: any }) => {
      return [0, el.innerHTML]
    },
    duration: 2000,
    // 将anime值 四舍五入为自定义位的小数
    round: 1,
    // easing指定行进速度， easeInExpo 加速度递增
    easing: 'easeInExpo'
  })
}

