# Office_Web

## Vite2 + Vue 3 + TypeScript

# 使用的 静态库
1. [animejs](https://github.com/juliangarnier/anime) 
2. [glidejs](https://github.com/glidejs/glide)
3. [isotope](https://github.com/metafizzy/isotope) `布局`
4. [scrollreveal](https://github.com/jlmakes/scrollreveal)
5. [FontAwesome](https://fontawesome.com/v6.0/docs/web/use-with/vue/) `字体库`



## BUG 记录
1. 使用isotope布局，在Edge浏览器中使用`layoutMode: 'fitRows`布局模式，在最后一行留白，无法补充🚨.  
    > 🧹 将布局模式更改为 `layoutMode: 'masonry`  

2. 使用fort-awesome,导入brands类别的icon, 将其添加到libray中报错🚨:  
    __类型“IconDefinition”的参数不能赋给类型 “IconDefinitionOrPack”的参数。不能将类型“IconDefinition”分配给类型“IconPack”。类型“IconDefinition”中缺少类型“string”的索引签名__
    > 🧹 直接忽略该错误
    ` // @ts-ignore`  
    由于ts无法识别IconDefinitionOrPack  


