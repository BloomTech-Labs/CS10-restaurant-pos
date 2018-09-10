let serverURI;

if (process.env.NODE_ENV === 'production') {
  serverURI = '';
} else {
  serverURI = 'http://localhost:5000';
}

export default serverURI;