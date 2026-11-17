Page({
  data: { input: '', mines: [], replies: [] },
  onInput(e) { this.setData({ input: e.detail.value }) },
  onSend() {
    const text = (this.data.input || '').trim()
    if (!text) return
    const id = Date.now()
    this.setData({
      mines: this.data.mines.concat({ id: 'm' + id, text }),
      input: ''
    })
    setTimeout(() => {
      this.setData({
        replies: this.data.replies.concat({
          id: 'r' + id,
          text: 'We have received your request and will contact you shortly. For emergencies, please call 400-123-4567.'
        })
      })
    }, 800)
  }
})
