'use strict';

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function decode(input) {
  return JSON.parse(decodeURIComponent(_atob(input)) || '{}');
}

function _atob(input) {
  // window.atob
  if (typeof window !== 'undefined' && window.atob) return window.atob(input);
  if (!input) return '';

  var str = String(input).replace(/[=]+$/, '');
  if (str.length % 4 == 1) {
    throw new Error('atob failed: The string to be decoded is not correctly encoded.');
  }
  for (
    var bc = 0, bs, buffer, idx = 0, output = '';
    buffer = str.charAt(idx++);
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    buffer = chars.indexOf(buffer);
  }
  return output;
}

if (typeof module !== 'undefined' && module.exports) module.exports = decode;
