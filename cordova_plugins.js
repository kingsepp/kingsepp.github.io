cordova.define('cordova/plugin_list', function (require, exports, module) {
  module.exports = [
    {
      file: 'plugins/org.bcsphere.bluetooth/www/bluetooth.js',
      id: 'org.bcsphere.bluetooth.bluetooth',
      merges: ['navigator.bluetooth'],
    },
  ];
});
