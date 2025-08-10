monolithic server - A monolith contains the routing, middlewares, business logic, and database access to implement ALL features of an app. 
microservice - A microservice contains the routing, middlewares, business logic and database access to implement just ONE feature of an app.

The biggest challenge of microservices is data management between services. 
Each service gets its own database. Services will never reach into another services database. This pattern is called Database-Per-Service. 
We want each service to run independently of other services.


## Communication Strategies between services
- synchronous - services communicate with each other using direct requests (doesn't necessarily have to be http) 
    - downsides include - introduces dependency between services, introduces potential web of requests
- asynchronous - services communicate with each other using events

event bus - handle little notifications being emitted from our different services, these notifications can be viewed as little objects that describe something that has happened, or needs to happen in our application. Services can connect to the event bus, and can receive or emit events.

First Async strategy - services emit events when data is needed, services that can provide that data listen for those events and respond to them with events that provide that data, which are consumed from the event bus by service that emitted teh request event. This strategy has all the downsides of the sync strategy, but also has the added complexity.

Second Async Strategy - services emit events when any relevant data changes on their service, then services that need that data for their own database listen for those events and update their database. This the strategy that is most common in the industry for microservices.

One strategy for how to create services is to have a service for each resource, eg Post and Comment.


# Microfrontend
Microfrontend - Divides a monolithic app into multiple, smaller apps. Each smaller app is responsible for a distinct feature of the product. Benefits include - multiple engineering teams can work in isolation. Each smaller app is easier to understand and make changes to. 

