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
- machine learning & artifical intelligence (not on exam)
- developer tools
- business applications (not on exam)


# Accessing and Using AWS Services

3 Ways to Access AWS
- the management console - graphical UI
- AWS command line interface (CLI) - command-driven access
- AWS software development kit (SDK) - programmatic access, infrastructure as code

The 3 ways to access AWS, behind the scenes, all send http requests to the AWS API - the API aws has that controls everything. 

AWS offers a variety of pricing models
- in advance
- in demand - most common pricing model since it is one of AWS core advantages
- subscription 

The AWS Pricing Calculator allows you to estimate the cost when using certain services.

The Free Tier allows you to use almost all services as long as you don't exceed the free tier quotas.

You can see billing and costs in the Billing and Cost Mananagement dashboard. There you will get a breakdown of all costs and what services are costing what. You can see expected costs, and there is a Cost Explorer to see more details. 

Budgets is a feature that allows you to set a budget and receive an email if you're getting close to your budget. (Budgets do not stop a service by itself. Once you get the email you have to manually decide to stop things if you want.)

## Support
When signing up you had to pick a support level, that gives you access to an agent that can help you through email or phone. You can upgrade at any time.

There is also a Service Health Dashboard, or AWS Health Dashboard. Here you can check for any internal issues or outages that might be affecting services you're using.

Service Documentation - always available for each service to deep dive into. There are tutorials and guides there as well.

Service Quotas - You can check page for service quotas and request an increase if needed.


# AWS Security

## AWS Security Model - Shared Responsibility Model
Security is a shared responsibility between AWS and you. AWS is responsible for securing infrastructure and physical machines, internal systems and processes, secured managed services. You are responsile for securing your applications and workloads, your accoutn and accout access and everythign else you can control.

Protect our account
- secure credentials 
- use mfa authentication
- utilize IAM users

IAM user - Identity and Access Management - useful for limited access to accounts

Identities + Access Management
- Identities are users, user groups, and roles
- Access Management is handled through Permissions via Policies

Users
- typically assiged to humans
- Every person that should be able to access the AWS account gets a user
User Groups
- Group users to share permissions
- avoid unnecessary permission copying or per-user management
Roles
- typically used by services
- allows services to perform AWS tasks

Go to IAM dashboard to create users, user groups, roles, permissions, and more.
When creating a user, you can choose to give programatic access (AWS API, CLI and SDK), and/or Management Console UI access.

Policies are documents that group permissions together. THere are many prebuilt policies to choose from. 

AdministratorAccess Policy gives access to all Permissions, except Billing, which you manually have to search for and add. Similar to linux user accounts, you should not use the root account if you can avoid it. Instead create a IAM user even if you are the owner and login using that, as a best practice.

Instead of assigning policy to user, you can just add them to a user group.

Creating roles is more complicated feature. Roles are created for you in many cases. But if you need a custom role for an AWS service to be able to interact with other services a certain way, or for an outside entity to be able to access aws, then you can create one by going through the wizard. (Need more precise definition for Role in aws.)

Policies can clash if, for example, individual permissions clash with group permissions. When permission clashes happen, deny permission take precedence. DENY overrides ALLOW.

By default, no permissions are granted to any identity(user, user group, role). Multiple policies can be combined to extend the set of permissions. Explicit DENYs overwrite explicit ALLOWs.

An important security concept is the idea of "Granting Least Privilege".

It means that you should never grant more permissions (to anyone) than needed.

For the root account, you should also delete the programmatic access keys as a best practice. The root account user should basically never be used because it has unlimited access rights.


# EC2

EC2 is the most important Compute service. It stands for Elastic Compute Cloud. Allows you to rent a virtual remote server / computer. Fully configurable. CAn run any kind of workload in the cloud. 

There are other useful Compute services, like ECS and EKS - Elastic Container Service, and Elastic Kubernetes Service. ECS is an alternative to EC2 for running containerized workloads.  Containers are packages of code + all of the code's dependencies including operating system. Containers allow developers to distribute and deploy reproducible code environments. ECS and EKS allow running clusters of containers easily.

Lambda is another useful Compute Service. It allows serverless code execution. Serverless services allow you to run code without configuring or controlling any servers. You can perform tasks in response to events by just providing the code that should be executed. Often, multiple serverless services must be combined to handle more complex workloads. AWS handles the underlying server configuration.

When using EC2, you are renting a slice of a computer, a virtual server, called an EC2 instance. When making an EC2 instance, you have to choose a region, and then a base image, or Amazon Machine Image. An Amazon Machine Image is the operating system + any other programs you want on your instance. You can choose from available images in the image marketplace or you can use EC2 Image builder to create your own. Then you have to pick the instance type - which is the hardware profile - memory, cpu etc. Instance types are grouped into instance type families. Different instance type families are optimized for different types of tasks. Then you have to add a key pair for connecting to the instance from your local machine. Then you have to choose some network settings, mainly firewall settings for the instance. (This probably sets up ufw on the instance, with the given settings). You can choose to allow SSH, HTTP, and/or HTTPS traffic from the options. This creates a SecurityGroup, which is a set of firewall settings. Every instance should have a SecurityGroup for it. SecurityGroups can be saved and used for other instances.

The user data field is a place to put script contents to run after operating system is installed.

You can see running instances in the EC2 Instances dashboard. Each instance gets its own ipv4 address and dns name (...amazonaws.com). You can connect to the EC2 instance from teh browser using EC2 Instance Connect, which will open a command line shell on the browser.

You can stop, reboot or terminate an instance. Stopping will just turn it off so that you can turn it back on later. Terminating is deleting.

EC2 Pricing
- on demand instances (default)
- spot instances (must be selected during instance creation) - provides spare instances at discount, can be shut down randomly by aws if needed by other customers.
- savings plan - must be bought separately from cost and billing section - pay in advance, agree to use a certain amount of guaranteed usage in the future which will give you a discount. ideal if you can commit long-term.
- reserved instances - similar to savings plan, pay in advance, but for specific configurations of instances. less flexible than Savings Plan


## VPCs

Although we can set up firewalls to block traffic with Security Groups (set of firewall settings), we might not want to be connected at all, as an extra layer of security but also as a meaningful architectural decision which can convey purpose.  

The VPC, or Virtual Private Cloud Service allows you to build your own virtual network in the cloud. The idea is you can have multiple EC2 instances you can group into one or more VPCs. You can then control network settings at a group level. You can control IP address assignment and network traffic can be controlled via VPCs.

You can control the actual network traffic and whether instances are connected to each other and/or the internet at all. So here we're not talking about blocking requests but the actual connectivity of instances. This is achieved through VPCs and Subnets. Inside a VPC you group your instances into subnets. You actually control network request settings on the subnet-level. You can make subnets private (only internal requests) or public (internet requests are possible).

With subnets, you can control whether an instance is connected to the internet or not, and also where in a region an instance should be launched. When grouping instances into subnets, private or public, you can choose which Availability Zone that subnet should be placed.

A public subnet becomes public when an Internet Gateway is added to it. When building a VPC, you can choose to add an Internet Gateway, and then connect certain subnets to that gateway. A private subnet  does not have access to an internet gateway and so its instances can only talk to each other and other instances in the VPC, but not to the internet. 

If you want internet connectivity for downloading only with no incoming requests being able to reach an instance, you can set up an NAT gateway (Network Access Translation), which can give private subnet instances indirect internet access only for outgoing requests. They have no publically visible IP address. (One good reason to want outgoing requests is for downloading patches of installed programs to update them.)
