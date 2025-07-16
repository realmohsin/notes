# AWS

AWS is a cloud computing services provider. 

Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing.  

Companies like Amazon own and operate IT resources and infrastructure in their own data centers distributed all over the world. These data centers packed with servers and you can rent this infrastructure in the manner that you need. 

Usually don't rent individual computers or servers, but rather you use services built on top of the IT insfrastructure. Example would be AWS EC2 - which is a service that allows you to rent a virtual server, which is just an isolated slice of an actual physical machine.

Machines and data centers are 'in the cloud' because as a customer, you don't need to worry about the infrastructure or hardware. Maintenance, Capacity planning & upgrades and Security is handled by trusted company like Amazon.  


## Advantages of Cloud Computing:  
Reliability 
You can build Reliable applications - meaning your application will always be available (maximum uptime) and will be able to handle any amount of traffic. You can also take advantage of data centers existing all over the world and fall back to other regions or go with a multi-region setup right from the start. You can move your workload to different regions within minutes or hours, instead of days or weeks.

Agility
You can use cloud resources within seconds or minutes. You can launch resources with a click or command. You can spin up servers and setup programs within minutes with a few clicks. 

Elasticity
You can start using more or less resources as needed, without any long term planning.

Scalability
You can scale up or down, as required. You can use auto-scaling services to reduce manual workload.

Pay-as-you-go
Only pay for services used, don't need to pay for services you're not using anymore. 

Cost Benefits
Trading fixed expenses for variable expenses. No CapEx (capital expenditure) for purchasing or operating your own hardware. Less OpEx(operating expenditure) since you only pay for the service usage, not for staff or power. You can benefit from AWS's economies of scale - AWS can realize discounts & savings on hardware which you can't because they are buying in bulk and so can offer back to you for cheaper.

Global Reach & High Availability
AWS owns & operates a world-wide network of data centers and so if one data center or group of data centers would go down, you can run your workloads in one of the many other regions.
Allows you to pick the perfect location, and spread your workloads to ensure high availability.

Summary of advantages: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html

# Regions
Aws operates data centers all over the world. One region contains multiple data centers. Regions are physically isolated from each other, if a disaster happens, not everything is affected. For many services, you can choose in which region it should run. Other services are global. 

Reasons for picking a certain region
- different pricing - aws faces different costs in different parts of the word, so costs can differ, Use the pricing pages or Pricing Calculator to learn more
- service availability - not all services can be used in all regions, some services are only available in certain regions
- legal reasons - companies might be legally required to use certain services in certain regions only
- availability & latency - workloads can be executed in multiple regions to increase availability & reliability. you can choose a region close to your end users to decrease latency

Data centers in a Region are organized (grouped) into availability zones (AZs). AZs are also separated from each other. One region contains at least 3 AZs, one AZ contains at least one data center. You can get reliability by spreading your workload across many AZ's within a region.

Some other terms to learn later: 'Local Zones', 'Edge Locations', 'Wavelength Zones', & 'AWS Outposts'. 

AWS also operates a world-wide network to connect all their regions. This means AWS owns and operates its own cables which connect all these locations, so you dont have to use the public internet for communicating between workloads you might be running in different regions, instead you can use AWS's own network if you want to. 


## Two types of services
Self-Service Services
- do it yourself
- fully configurable
- underlying hardware is still managed by AWS

Managed Services
- AWS manages the hard parts
- Partially configurable
- Can be used together with other services (incl self-service services)


## Categories of Services
unofficial categories:
- compute`
- data storage
- database
- networking & content delivery
- application integration
- security
- cloud management
- migration & edge computing
- analytics & data ingestion
- machine learning & artifical intelligence
- developer tools
- business applications