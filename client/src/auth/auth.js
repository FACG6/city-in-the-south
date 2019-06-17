const auth = {
  isAuthenticated: false,
  error: null,
  authenticate(cb) {
    fetch('/api/v1/isAuthenticated', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.isAuthenticated = true;
          cb();
        } else {
          this.isAuthenticated = false;
          cb();
        }
      })
      .catch(err => {
        this.error = err;
      });
  },
  logout() {
    this.isAuthenticated = false;
  },
};
export default auth;
