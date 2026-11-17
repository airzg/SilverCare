Page({
  onReview() { wx.showToast({ title: 'Report details (demo)', icon: 'none' }) },
  onShare() {
    wx.showModal({
      title: 'Share with family',
      content: 'The service report is ready to share with your family.',
      confirmText: 'Copy link',
      cancelText: 'Cancel',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({ data: 'SilverCare service report CN-2026-0418 · Next visit 2 June' })
        }
      }
    })
  }
})
