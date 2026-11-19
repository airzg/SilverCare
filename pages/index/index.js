Page({
  data: {
    thirdLabel: 'Service report'
  },

  goBook() { wx.navigateTo({ url: '/pages/book/book' }) },
  goOrders() { wx.switchTab({ url: '/pages/orders/orders' }) },
  goUrgent() { wx.navigateTo({ url: '/pages/urgent/urgent' }) },
  onThirdTap() { wx.navigateTo({ url: '/pages/report/report' }) },
  goProfile() { wx.switchTab({ url: '/pages/customer/customer' }) },
  onSetting() { wx.showToast({ title: 'Settings (demo)', icon: 'none' }) }
})
