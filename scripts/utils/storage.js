const storage = {
  set: function(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  get: function(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  },

  remove: function(key) {
    localStorage.removeItem(key);
  }
}

export default storage;