const storage = {
  set: function(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  get: function(key) {
    const data = JSON.parse(window.localStorage.getItem(key));
    return data;
  }
}

export default storage;