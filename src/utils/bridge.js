let bridge = window._wmjs;

const { pop, navigateTo, pay, uploadFile, share, showQr } = bridge || {};

export function back(params = {}, callback = () => {}) {
  pop && pop(params, callback);
}

export function navigate(params = {}, callback = () => {}) {
  console.log('test')
  // window._wmjs && window._wmjs.navigateTo({
  //   url: 'upload-home-work',
  //   studentOrganTutorId: '1'
  // }, function(data) {
  // })
  navigateTo && navigateTo(params, callback);
}

export function wxPay(params, callback = () => {}) {
  pay && pay(params, callback)
}

export function upload(params, callback = () => {}) {
  uploadFile && uploadFile(params, callback)
}

/**
 * 
 * // final String webPage; ///必传
  // final String thumbnail;  ///必传
  // final String title;  ///必传
  // final String description;  ///必传
  // final String messageExt; ///必传
  // final String messageAction;
  // final String mediaTagName;
  webPage: 'http://www.baidu.com',
  thumbnail: '我喜欢的歌曲分享给你',
  description: '话说这是一个...',
  messageExt: 'messageExt',
  mediaTagName: 'mediaTagName',
  thumbnail: 'http://www.baidu.com/meijing.jpg'
 */
export function shareTo(params, callback = () => {}) {
  share && share(params, callback)
}

export function showQrModal(params, callback = () => {}) {
  showQr && showQr(params, callback);
}