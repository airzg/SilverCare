const app = getApp()

Page({
  data: { orders: [] },
  onShow() { this.setData({ orders: app.globalData.orders }) },
  onOrder(e) {
    const id = e.currentTarget.dataset.id
    const order = this.data.orders.find(o => o.id === id)
    wx.showModal({
      title: 'Order ' + id,
      content: order.service + '\n' + order.date + ' · ' + order.hospital + '\nStatus: ' + order.status,
      showCancel: false,
      confirmText: 'OK'
    })
  }
})
