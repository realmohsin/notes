node runs in a single process, without creating a new thread for every request.
node's i/o primitives are asynchronous and so most javascript code in node is non-blocking.

node assumes you are running in development unless NODE_ENV is set to something else. Certain performance optimizations will only take place in production node process such as - default logging is kept to a minimum and more caching levels take place.

