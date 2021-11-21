# Office_Web

## Vite2 + Vue 3 + TypeScript

# 使用的 静态库
1. [animejs](https://github.com/juliangarnier/anime) 
2. [glidejs](https://github.com/glidejs/glide)
3. [isotope](https://github.com/metafizzy/isotope) `布局`
4. [scrollreveal](https://github.com/jlmakes/scrollreveal)
5. [FontAwesome](https://fontawesome.com/v6.0/docs/web/use-with/vue/) `字体库`



## BUG 记录
1. 使用isotope布局，在Edge浏览器中使用`layoutMode: 'fitRows`布局模式，在最后一行留白🚨，无法补充.  
    - 🧹 将布局模式更改为 `layoutMode: 'masonry`