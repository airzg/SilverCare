const app = getApp()

Page({
  data: {
    completedCount: 0,
    upcomingCount: 0
  },
  onShow() {
    const orders = app.globalData.orders
    this.setData({
      completedCount: orders.filter(o => o.status === 'Completed').length,
      upcomingCount: orders.filter(o => o.status === 'Scheduled' || o.status === 'In progress').length
    })
  },
  goReport() { wx.navigateTo({ url: '/pages/report/report' }) },
  goOrdersWithFilter(e) {
    app.globalData.orderFilter = e.currentTarget.dataset.filter
    wx.switchTab({ url: '/pages/orders/orders' })
  },
  onAccountTap(e) {
    const title = e.currentTarget.dataset.title || 'This item'
    wx.showToast({ title: title + ' demo', icon: 'none' })
  },
  onSetting() { wx.showToast({ title: 'Settings demo', icon: 'none' }) }
})
