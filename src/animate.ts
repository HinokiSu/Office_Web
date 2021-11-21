/* 自定义Anime */

import anime from 'animejs'

// 标题 caption 显示的Anime
export function CaptionAnime(element: any) {
  anime({
    targets: element,
    opacity: [0, 1],
    // 动画执行时间
    duration: 400,
    // anime执行函数 "线性的"
    easing: "linear",
    // 为targets 添加stagger交错, 第一个出现先等待300ms, 后面的以400ms再出现
    delay: anime.stagger(400, {start: 300}),
    translateY: [anime.stagger([40, 10]), 0]
  })
}