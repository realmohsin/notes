monolithic server - A monolith contains the routing, middlewares, business logic, and database access to implement ALL features of an app. 

microservice - A microservice contains the routing, middlewares, business logic and database access to implement just ONE feature of an app.

The biggest challenge of microservices is data management between services. 

Each service gets its own database. Services will never reach into another services database. This pattern is called Database-Per-Service. 

We want each service to run independently of other services.

## Communication Strategies between services
- synchronous - services communicate with each other using direct requests (doesn't necessarily have to be http) 
