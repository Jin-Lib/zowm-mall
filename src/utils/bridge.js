let bridge = window._wmjs;

const { pop, navigateTo } = bridge || {};

export function back(params = {}, callback = () => {}) {
  pop && pop(params, callback);
}

export function navigate(params = {}, callback = () => {}) {
  // window._wmjs && window._wmjs.navigateTo({
  //   url: 'upload-home-work',
  //   studentOrganTutorId: '1'
  // }, function(data) {
  // })
  navigateTo && navigateTo(params, callback);
}