const app = getApp()

const TITLES = {
  'Scheduled': 'Visit scheduled',
  'In progress': 'Visit in progress',
  'Completed': 'Visit completed'
}

const STEP_DEFS = [
  { key: 'accepted', title: 'Accepted', done: 'Booking confirmed', active: 'Confirming booking', pending: 'Waiting for confirmation' },
  { key: 'arrived', title: 'Arrived', done: 'Arrived at hospital', active: 'On the way', pending: 'Not arrived yet' },
  { key: 'with', title: 'With patient', done: 'Service finished', active: 'Serving now', pending: 'Not started yet' },
  { key: 'completed', title: 'Completed', done: 'Report sent to you', active: 'Finishing up', pending: 'A report will be sent to you' }
]

function buildSteps(status) {
  let doneCount = 0
  let activeIndex = -1
  if (status === 'Scheduled') {
    doneCount = 1
  } else if (status === 'In progress') {
    doneCount = 2
    activeIndex = 2
  } else if (status === 'Completed') {
    doneCount = 4
  }

  return STEP_DEFS.map((def, index) => {
    let state = 'pending'
    let desc = def.pending
    if (index < doneCount) {
      state = 'done'
      desc = def.done
    } else if (index === activeIndex) {
      state = 'active'
      desc = def.active
    }
    return { key: def.key, title: def.title, desc, state }
  })
}

Page({
  data: {
    order: null,
    headerTitle: 'Order details',
    steps: [],
    showFinish: false,
    finishTime: '11:20',
    showNext: false,
    nextLines: []
  },
  onLoad(options) {
    const id = decodeURIComponent(options.id || '')
    const order = app.globalData.orders.find(o => o.id === id)
    if (!order) {
      wx.showToast({ title: 'Order not found', icon: 'none' })
      return
    }
    const title = TITLES[order.status] || 'Order details'
    this.setData({
      order,
      headerTitle: title,
      steps: buildSteps(order.status),
      showFinish: order.status === 'In progress',
      showNext: order.status !== 'Completed',
      nextLines: ['Report and photos sent within 2 hours', 'Follow up booking for ' + order.date]
    })
  },
  onCall() {
    wx.makePhoneCall({
      phoneNumber: '4001234567',
      fail: () => wx.showToast({ title: 'Call demo', icon: 'none' })
    })
  },
  onNotify() { wx.showToast({ title: 'Family notified demo', icon: 'none' }) }
})
