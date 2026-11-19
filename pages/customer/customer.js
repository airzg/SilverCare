Page({
  onSetting() { wx.showToast({ title: 'Settings (demo)', icon: 'none' }) },
  goBook() { wx.navigateTo({ url: '/pages/book/book' }) },
  goOrders() { wx.switchTab({ url: '/pages/orders/orders' }) },
  goReport() { wx.navigateTo({ url: '/pages/report/report' }) },
  goUrgent() { wx.navigateTo({ url: '/pages/urgent/urgent' }) }
})
