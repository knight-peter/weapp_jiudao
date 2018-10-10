// components/classic/music/index.js
import classicBeh from '../classic-beh'
const InnerAudioContext = wx.createInnerAudioContext()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    title: String,
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },
  /* 组件生命周期函数，在组件实例进入页面节点树时执行 */
  attached() {
    console.log({
      '进入，InnerAudioContext.paused': InnerAudioContext.paused
    })
    this._recoverStatus()
    this._monitorSwitch()
  },
  /* 组件生命周期函数，在组件实例被从页面节点树移除时执行 */
  detached: function () {
    // InnerAudioContext.stop()
    console.log({
      '离开，InnerAudioContext.paused': InnerAudioContext.paused
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        InnerAudioContext.play()
        InnerAudioContext.src = this.properties.src
        // InnerAudioContext.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        InnerAudioContext.pause()
      }
    },
    /* 判断音乐播放 */
    _recoverStatus() {
      // 当前没有任何音乐播放

      if (InnerAudioContext.paused) {
        this.setData({
          playing: false
        })
        return
      }

      if (InnerAudioContext.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      InnerAudioContext.onPlay(() => {
        this._recoverStatus()
      })
      InnerAudioContext.onPause(() => {
        this._recoverStatus()
      })
      InnerAudioContext.onStop(() => {
        this._recoverStatus()
      })
      InnerAudioContext.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})