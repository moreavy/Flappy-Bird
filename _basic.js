window.errors = [];

if (window.addEventListener) {
  window.addEventListener('error', function (e) {
    if (e.message) {
      if (e.error && e.error.stack) {
        if (e.message.indexOf('Uncaught SyntaxError') === 0) {
          window.errors.push(e.message + ' at ' + e.filename + ':' + e.lineno + ':' + e.colno);
        } else {
          window.errors.push(e.error.stack);
        }
        if (window.onNewError) window.onNewError();
      }
    } else {
      window.errors.push('Problem loading ' + (e.target.src || e.target.href));
      if (window.onNewError) window.onNewError();
    }
    window.onerror = null;
  }, true); // true so that errors bubble up to window
  window.addEventListener('unhandledrejection', function (e) {
    window.errors.push(e.reason && (e.reason.stack || e.reason.message || e.reason));
    if (window.onNewError) window.onNewError();
  }, false);
}

window.onerror = function (message, source, lineno, colno, error) {
  if (colno) {
    lineno += ':' + colno;
  }
  if (error && error.stack) {
    window.errors.push(error.stack);
  } else {
    window.errors.push(message + ' at ' + source + ':' + lineno);
  }
  if (window.onNewError) window.onNewError();
};
