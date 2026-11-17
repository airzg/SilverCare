const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function pad(n) {
  return n < 10 ? '0' + n : '' + n
}

function formatDate(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

function buildDates(count, base) {
  const today = base || new Date()
  const list = []
  for (let i = 0; i < count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    list.push({
      key: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()),
      day: WEEK[d.getDay()],
      date: d.getDate() + ' ' + MONTH[d.getMonth()]
    })
  }
  return list
}

function currentSlot() {
  const hour = new Date().getHours()
  if (hour < 12) return 'm'
  if (hour < 17) return 'a'
  return 'all'
}

Page({
  data: {
    dates: [],
    date: '',
    minDate: '',
    maxDate: '',
    times: [
      { key: 'm', name: 'Morning', range: '8:00-12:00' },
      { key: 'a', name: 'Afternoon', range: '13:00-17:00' },
      { key: 'all', name: 'All day', range: '8:00-17:00' }
    ],
    time: 'm',
    services: [
      { name: 'Outpatient companion', price: '200', duration: '2 hours' },
      { name: 'Elderly care companion', price: '260', duration: '3 hours' },
      { name: 'Report collection only', price: '120', duration: '1 hour' }
    ],
    serviceIndex: 0,
    service: { name: 'Outpatient companion', price: '200', duration: '2 hours' },
    includes: ['Booking and queue handling', 'Waiting, guidance, interpretation', 'Pharmacy and report collection']
  },
  onLoad() {
    const today = new Date()
    const dates = buildDates(3, today)
    const lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60)
    this.setData({
      dates,
      date: dates[0].key,
      time: currentSlot(),
      minDate: formatDate(today),
      maxDate: formatDate(lastDay)
    })
  },
  onDate(e) { this.setData({ date: e.currentTarget.dataset.key }) },
  onTime(e) { this.setData({ time: e.currentTarget.dataset.key }) },
  onCalendar(e) {
    const value = e.detail.value
    if (!value) return
    const parts = value.split('-')
    const picked = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
    const dates = buildDates(3, picked)
    this.setData({ dates, date: dates[0].key })
  },
  onService() {
    wx.showActionSheet({
      itemList: this.data.services.map(s => s.name),
      success: (res) => {
        const s = this.data.services[res.tapIndex]
        this.setData({ serviceIndex: res.tapIndex, service: s })
      }
    })
  },
  onConfirm() {
    const picked = this.data.dates.find(d => d.key === this.data.date)
    if (!picked) {
      wx.showToast({ title: 'Please pick a date', icon: 'none' })
      return
    }
    const dateLabel = picked.date
    const timeLabel = this.data.times.find(t => t.key === this.data.time).name
    getApp().globalData.orders.unshift({
      id: 'CN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 8999),
      date: dateLabel,
      hospital: 'PUCH',
      service: this.data.service.name,
      status: 'Scheduled'
    })
    wx.showModal({
      title: 'Booking confirmed',
      content: dateLabel + ' · ' + timeLabel + '\n' + this.data.service.name + ' · RMB ' + this.data.service.price,
      showCancel: false,
      confirmText: 'OK',
      success: () => wx.navigateBack()
    })
  }
})
