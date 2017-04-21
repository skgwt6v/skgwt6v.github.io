/**
 * @desc - 関数などのイベントを任意の時間遅延させます。
 * @link - https://davidwalsh.name/javascript-debounce-function
 * @example
 * $(window).on('resize', debounce(function() {
 *   func1();
 *   func2();
 * }, 200));
 */
debounce = function(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if ( !immediate ) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 200);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

/**
 * @desc - 関数などのイベントを任意の時間が経つたびに実行します。
 * @link - https://gist.github.com/edwinwebb/e71bde8b00ff40f3f046
 * @example
 * $(window).on('scroll', throttle(function() {
 * func();
 * }, 200));
 */
function throttle(func, wait, options) {
  var _ = {
    now :  Date.now || function() {
      return new Date().getTime();
    }
  }
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

//# sourceMappingURL=bundle.js.map
