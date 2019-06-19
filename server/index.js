const http = require('./app');

const port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log(`server is running on port:${port}`);
});

// kill the process in dev mood
if (process.env.NODE_ENV === 'development') {
  // works with <ctrl> + C terminate
  process
    .on('SIGINT', (sig) => {
      console.log('Exit node process', sig);
      process.exit(0);
    })
    // works with <ctrl> + Z susspend
    .on('SIGTSTP', (sig) => {
      console.log('Exit node process', sig);
      process.exit(0);
    });
}
module.exports = http;
