var JsBridge = {
  /// 调用flutter方法时，需要传递的参数
  // @param args: {
  // method: String,
  // data: Map<String, String>   
  //}
  // flutter调用js时执行的方法，js用于获取返回的数据
  //cb: Function  
  call: function (args, cb) {
    var arg = args === undefined ? null : args;
    /// 将该次通信的callback用自增id标识，并挂到window上，方便_handleMessageFromNative调用时，
    /// 唯一标识
    if (typeof cb == 'function') {
      var cbName = '_wmcallbak' + window.wmCallbackIndex++;
      /// 将回调挂到window上
      window[cbName] = cb;
      /// 将window上回调独一的名称传递给flutter
      arg['_wmcallback'] = cbName;
    }
    /// flutter.postMessage只支持String
    arg = JSON.stringify(arg);

    /// 调用webview上flutter注册的方法，与flutter进行通信
    if (window.WMjavascriptChannel) {
      WMjavascriptChannel.postMessage(arg)
    }
  },

  /// 前端注册号需要调用的方法，如：pop
  registerMethod: function (methodName) {
    if (!window._wmjs) {
      return;
    }

    _wmjs[methodName] = function (args, callback) {
      var callArgs = { method: methodName, data: args === undefined || args === null ? {} : args };
      _wmJsBridge.call(callArgs, callback);
    }
  },
};

!function () {
  /// 如果已经注册过，则返回
  if (window._wmjs) return;
  var ob = {
    _wmjs: {},
    _wmJsBridge: JsBridge,
    /// 为了区别不同的callback设置的自增id
    wmCallbackIndex: 0,
    /// flutter会通过webview的evaljavascript的方法执行这个javascript的方法，并传递相应的值
    /// 该方法根据info.callbackId，来回调指定的方法，并根据该id，删除window上的指定方法
    _handleMessageFromNative: function (info) {
      var arg = JSON.parse(info);
      var callbackName = arg.requestModel._wmcallback;
      /// 根据id，回调方法
      window[callbackName](arg.response);
      /// 删除window上的指定方法
      delete window[callbackName];
    }
  }
  for (var attr in ob) {
    window[attr] = ob[attr]
  }

  _wmJsBridge.registerMethod('pop');
  _wmJsBridge.registerMethod('navigateTo');
}();