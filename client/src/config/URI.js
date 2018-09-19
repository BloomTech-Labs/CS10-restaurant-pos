// eslint-disable-next-line import/no-mutable-exports
let serverURI;

if (process.env.NODE_ENV === 'production') {
  serverURI = '';
} else {
  serverURI = 'http://localhost:5000';
}

export default serverURI;


// ! Try this:
// if (process.env.NODE_ENV === 'production') {
//   export default '';
// } else {
//   export default 'http://localhost:5000';
// }
