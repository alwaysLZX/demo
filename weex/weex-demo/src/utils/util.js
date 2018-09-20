let util = {
  initIconFont () {
    let domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('http://at.alicdn.com/t/font_744050_1s063v7trhj.ttf')"
    })
  }
}

export default util
