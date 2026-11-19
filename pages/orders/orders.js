const app = getApp()

function filterOrders(filter) {
  const all = app.globalData.orders
  if (filter === 'Upcoming') return all.filter(o => o.status === 'Scheduled' || o.status === 'In progress')
  if (filter === 'Completed') return all.filter(o => o.status === 'Completed')
  return all
}

Page({
  data: {
    orders: [],
    filter: 'All',
    filters: ['All', 'Upcoming', 'Completed']
  },
  onShow() {
    const requested = app.globalData.orderFilter
    if (requested) {
      app.globalData.orderFilter = ''
      this.setData({ filter: requested })
    }
    this.setData({ orders: filterOrders(this.data.filter) })
  },
  onTabItemTap() {
    this.setData({ filter: 'All', orders: filterOrders('All') })
  },
  onFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({ filter, orders: filterOrders(filter) })
  },
  onOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/order-detail/order-detail?id=' + encodeURIComponent(id) })
  }
})
