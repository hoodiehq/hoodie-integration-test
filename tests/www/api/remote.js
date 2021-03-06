/* global hoodie */

module.exports = function(expect, hosts) {

  var username = 'storeuser' + Date.now();
  var password = 'hoodiepassword';
  return this.remote
    .setExecuteAsyncTimeout(10000)

    // make sure we have a clean state
    .get(hosts.www)

    // not supported by Firefox it seams:
    // .clearLocalStorage()
    .executeAsync(function(callback) {
      localStorage.clear();
      setTimeout(callback, 1000);
    })

    // start
    .get(hosts.www)

    // prepare events tracking
    .execute(function() {
      window.events = [];

      [
        'connect',
        'change',
        'add',
        'update',
        'remove',
        'push'
      ].forEach(function(eventName) {
        hoodie.remote.on(eventName, function() {

          window.events.push({
            name: eventName,
            args: [].slice.call(arguments)
          });
        });
      });
    })

    // not connected per default
    .execute(function() {
      return hoodie.remote.isConnected();
    })
    .then(function(isConnected) {
      expect(isConnected).to.equal(false);
    })

    .executeAsync(function(username, password, callback) {
      hoodie.account.signUp(username, password)
      .done(callback)
      .fail(function(error) {
        throw error;
      });
    }, [username, password], 30000)

    // connected after sign up
    .execute(function() {
      return hoodie.remote.isConnected();
    })
    .then(function(isConnected) {
      expect(isConnected).to.equal(true);
    })

    .execute(function() {
      return window.events;
    })
    .then(function(events) {
      expect(events[0].name).to.equal('connect');
    })

    // still connected after page reload
    .get(hosts.www)
    .waitForConditionInBrowser('hoodie.remote.isConnected() === true', 10000)
    .execute(function() {
      return hoodie.remote.isConnected();
    })
    .then(function(isConnected) {
      expect(isConnected).to.equal(true);
    })

    // cleanup
    .executeAsync(function(callback) {
      localStorage.clear();
      setTimeout(callback);
    });
};
