# Notes while getting on AWS
Turned on IAM Identity Center which was formerly known as AWS Single Sign On. Seems to jst be an addition to the normal IAM service - the additionn being the ability to bring on outside identity providers to create IAM users that can be used in AWS.


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

You start with one default VPC per region. VPC is a regional construct. REgions matter for most AWS services. 

When making a new VPC you'll have to specify - # of AZs, # of public subnets, # of private subnets, NAT gateways, VPC endpoints.

Route tables - Tell AWS how to forward incoming network requests whether its a request sent from an instance inside the VPC to another instance, or if they are incoming from the internet.

Network Connections - Internet Gateway
NAT Gateway costs money, are not part of free tier.
VPC Endpoint - can help reduce NAT gateway charges adn improve security by accessing S3 directly from the VPC. 


## CIDR IP ranges
 
An IP address is a 32 bit number. IP addresses are unique so that they can reach the right machine.

You might want to create ranges of IP address for example inside a VPC, where you only need instances to communicate with each other.

172.31.0.0/16 --> specifies a range, says that 16 bits are fixed so the range is 172.31.0.0 - 172.31.255.255

When we specify a CIDR IP range for a VPC it means all instances inside that VPC will receive internal, private IP addresses in that range. 172.x.x.x is reserved for private networks, by convention.

0.0.0.0/0 means 0 bits are fixed, so it just says all possible IP addresses.

The point of using 172.x.x.x and a range for private IP addresses is so we don't use valuable public IP addresses as there are only so many unique combinations and we need them for the world.

Elastic IP
When you make a public EC2 instance a rare, public IP address is automatically assigned by the subnet to it, however, that public IP address will change the next time you restart your instance, or when its started after being stopped. This can be inconvenient. For a stable IP address, you can use Elastic IP addresses, which are IP addresses given to you by AWS that you can assign and manage yourself.

Elastic IP's cost money and you can only hae a few per region and per account.

Elastic IP's however, might not be needed because domain name mappings can be changed when an underlying IP address changes and end customer will not notice. (Come back to this topic to explain more.)

SecurityGroup
You can create and save custom SecurityGroups. SecurityGroups are firewall rules that control inbound and/or outbound traffic. Many times you want unlimited outbound traffic, but restrict inbound traffic. There are premade SecurityGroups you can choose from, or you can make your own. Note: You can restrict IPs with SecuirtyGroups. 

## Network Access Control List (NACL)

NACL's are about controlling requests, but here, you don't control requests that reach a single instance, as you do with SecurityGroups, but requests that reach an entire subnet. They apply to all instances in a subnet. NACL, like SecurityGroups, have inbound and outbound rules. 

AWS recommends using SecurityGroups over NACLs.


## Security Group vs Network ACL vs Private/Public Subnets
SecurityGroup 
- Firewall for a single EC2 instance
- Checks incoming / outgoing requests and conditionally blocks or allows them
- Stateful - Responses are always allowed (if the request passed)
- Multiple instances can have different SecurityGroups
- SecurityGroups can be re-used for multiple instances

Network ACL
- Firewall for entire subnets
- Checks incoming / outgoing requests and conditionally blocks or allows them
- Stateless - Requests and responses are decoupled
- One NACL can be associated with multiple subnets

Private / Public Subnets
- Defines technical connectivity
- No internet access without internet gateway (incoming + outgoing) or NAT gateway (outgoing)
- Does not control any requests or responses
- Multiple instances can be in the same subnet


## VPC Peering & Transit Gateways

VPC Peering is a technology or a feature offered by AWS for connecting two VPCs. If you have more than two VPCs to connect, AWS gives you another service or feature called Transit Gateways, which you can setup to connect multiple VPCs.


## Private Connections via PrivateLink & VPC Endpoints

Normally, when one AWS service wants to communicate with another AWS service, it will use the public internet to do so. Therefore, you would need internet connectivity, which might mean you cannot take advantage of selective usage of internet or NAT gateways for protection. If you don't need internet connectivity, except for say, connecting to AWS S3, then instead of turning on internet connectivity, you can use AWS PrivateLink. When using this feature, you can send requests to other AWS services without requiring internet connectivity because you use the internal AWS network. You can do this by setting up so called VPC Endpoints.


## Managing Cloud Networks via VPCs Summary

VPCs
- Your own network in the cloud (for grouping EC2 instances)
- A VPC contains at least two subnets & one route table
- Subnets can be 'public' or 'private'
- Route table settings control subnet 'visibility'

Network Management
- Every VPC has an IP CIDR block assigned (range of IPs)
- Subnets get parts of the VPC CIDR block assigned
- EC2 instances receive auto-assigned public and private IPs
- Elastic IPs can be used for fixed IP addresses
- VPC peering or transit gateways can connect VPCs

Request Management
- Internet gateways allow for two-way internet access
- NAT gateways enable outgoing internet requests
- NACLs allow or deny requests on subnet-level (however, AWS recommends Request management on the instance level using SecurityGroups)
- Endpoints (PrivateLink) connect AWS services to VPCs



# Dynamic Scaling & Load Balancing

There is a max capacity of incoming requests that can be handled and that is dictated by the underlying hardware. But when using AWS, you can adjust the capacity you have dynamically. 

EC2 Auto Scaling - Service which can be used to automatically add or remove EC2 instances based on conditions. Ennsures sufficient capacity at all times, without over-provisioning. In Auto Scaling Groups, you can create a launnch template that will define the connfiguration for the instances that will be created.

Elastic Load Balancer (ELB) - Service to distribute load (eg, incoming requests) evenly across available instannces. Ensures that all available instances are utilized equally. (Consists of Application Load Balancer and Network Load Balancer)

Application Load Balancer (ALB) - Feature-rich, broad variety of request forwarding connditions & rules, Capable of SSL termination, Can reduce app complexity, --> Use for (most) HTTP apps

Network Load Balancer (NLB) - Very lean, limited connfiguration options, fixed IP address, perfect for non-HTTP apps, --> Use for non-HTTP apps

- Elasticity, Scalability, & High Availability
    - Workloads don't necessarily have even load patterns
    - Too little or too much capacity cann be a big problem
    - Being able to scale instantly & automatically is important
    - Load should also be distributed evenly to avoid downtimes
Auto Scaling
    - Automatically add / remove instances
    - Set clear rules and min/max requirements
    - Instannce count is adjusted to incoming laod based on rules
    - Use launnch templates & VPC / subnet settings
Elastic Load Balancer
    - ALB & NLB can be used for distributing traffic evenly
    - Define target groups (in VPCs / Subnets) and forwarding rules
    - ALB is perfect for HTTP traffic (and feature-rich)
    - NLB is great for other network traffic



# File Storage with EBS, EFS & S3
Files gennerated by web applications - user uploads, generated invoices, trannsformed images, etc...
File archivinng - Accounnting files, legal documentns, vacation images, 

There are different kinds of file storage
- Block Storage - Ann unformatted hard drive, Format and structure before using, create custom structure & store any files. Attach a virtual hard drive to a server. EBS service exists for this, can only be attached to EC2 instances.

- Object Storage - No information about underlying system, Store & retrieve files of any kind of size as needed, No (real) custom structure can be created - Store files without caring about the underlying system - S3 service exists for this

- File System - A (network) file system, A pre-formatted - configured file system, create custom structure & store any files. - Get a virtual file system without anny mannual setup - EFS, FSx service exists for this

## EBS - Elastic Block Storage
Hard drives, attached to EC2 instances - Multiple volumes can be attached to a single instance
Can be formatted & structured as needed - via the commannd line (or code), from inside the instance
Only available to EC2 instances
Different types
    - SSD vs HDD
    - Optimized for different workloads & tasks
Elastic Volumes
    - If needed, volumes cann scale dynnamically
    - extra feature - must be enabled / managed
Snapshots
    - EC2 instance data & state can be saved
    - Restore snapshots onn nenw EC2 instances
Multi Attach
    - Attach volumes to multiple EC2 instances
    - Supported on some instances

All EC2 instances have some base storage - contains operating system, base software, etc... This can be an EC2 Instance Store which is an alternative to EBS-backed storage. EC2 Instance Store is the harddrive which is part of the machinne / rack in the data center. EBS-backed storage is a managed EBS Volume. Even though EBS-backed is more frequently used now, EC2 Instance Store is still available and can be used, and this is decided at the AMI level. You'll notice whenn selecting AMI, the text 'Root device type: ebs'. This means the root device is an EBS volume. 


## EFS - Elastic File System
Scalable, pre-formatted file systems, where we don't have to or want to worry about the underlying hardware configuration. Can be structured as needed - via the command linne or code. Can be attached & accessed to /from multiple services, not just EC2 instances. 

Difference between EFS & EBS
EBS - Unnformatted hard drive, less automatic scaling, more manual work, multi-attach is possible but not the focus, ec2-exclusive (onnly for ec2 insntannces)
EFS - Pre-formatted file system, scales automatically, multi-attach is a core feature, Can be used with multiple services                

EFS is a regional service, you have to create them per region and they are only available for services in that region. EFS also has security groups because they are themselves somewhat separate entities.

FSx Lustre - Sometimes ann alternative to EFS, for high-performannce file access workloads, but no feature equality

## Summary of File Storage Services

File Storage Services
    - Store application, user, businness or personanl files
    - Different kinds of storage: hard drives, file systems, objects
    - EBS, EFS, FSx Lustre & S3 are AWS's main storage services
EBS
    - Attachable block storage (unnformatted hard drives)
    - Format, structure & use mannually
    - For EC2 instances only
    - Extra features: Snapshots, elastic volumes, multi-attach
EFS
    - Attachable pre-configured file system
    - Built for (dynamic) scalability & multi-access
    - For multiple AWS Services
    - FSx Luster for high-performance file access tasks

EBS is a perfect sservice if you need a harddrive, but if you don't want to deal with formatting a harddrive, of if you don't want to decide how much space you need, EFS can be a great alternative.



# Object Storage with S3 (Simple Storage Service)
Understanding Object Storage
- Focus on the file, not the underlying system
- Store any kind of file with (almost) any kind of size

Main difference between S3 and EBS / EFS is that it is completely standalone, does not have to be attached to EC2 or other AWS service. It can be accessed from anywhere - you can upload (and delete or read) via console, CLI, HTTP API, SDK, etc.

Buckets - Files are organized in buckets ('folders'), can't have nested buckets

S3 does not provide a file system where you could create subfolders, instead all files are stored in buckets. You can create as many buckets as needed. No need to specify a size, buckets will scale as needed. Buckets are regional (can matter for latency reasons as well as legal reasons.) Bucket name must be unique across all of AWS. 

S3 is a flat structure, no directories, prefixes help with organizing files. There is a detailed permissions system - control bucket and file level access. Via Bucket Policies (recommended) or ACLs (not recommended). Bucket Policies are similar to IAM policies.

Can be public or private.


## Storage Classes
Frequent Access
 - accessed very frequently (eg, every seconds / minute)
 - instant access required
-> highest flexibility but no cost savings

Infrequent Access
- accessed infrequently (eg, time to time)
- instant access possible
-> Cost savings but retrieval cost

Archive
- almost never accessed
- instant access not always possible
-> High cost savings but less flexibility
^ Archive services include - S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, S3 Glacier Deep Archive

S3 Intelligent Tiering
- automatically move files to the most cost-effective storage class based on access patterns


## S3 Advanced Features
- Versioning - store multiple versions of the same object
- Lifecycle Management - Transition files between storage classes
- Inventory & Analytics - Understand stored files & data
- Compliance & Object Lock - Prevent object deletion / changes
- Replication - Auto-replicate objects cross-bucket
- Data Protection & Encryption - Automatically encrypt stored data
- Static Website Hosting - Upload & host (static) website files (just enable option, and upload the files)

When unchecking box for 'Block all public access' at bucket creation, it doesn't mean the bucket is public yet, you have to still go to permissions tab later to set proper permissions.

## S3 vs EBS vs EFS
EBS
- Attachable hard drives
- EC2 only
- Automatic scaling & multi-attach possible
EFS
- Attachable file systems
- Multiple services
- Automatic scaling & multi attach are key features
S3
- Independent object storage
- Access with or without services
- Unlimited scaling built-in


## Summary
S3 - Object Storage
- Focus on the objects /files, not the underlying system
- Organize files into buckets
- Access (upload, delete, retrieve) via services, CLI, HTTP API, etc
Managing Objects & Storage
- Different storage classes for different access patterns
- Lifecycle Management
- Fine-grained permission management
- Encryption possible
Advanced Features
- Inventory overview & data analytics
- Static website hosting
- Versioning & object lock
- Cross-region or single-region cross-bucket replication


# Databases in the Cloud: RDS, Aurora, ElastiCache & DynamoDB
Data can be stored & structured in different ways
Two main kinds of database types
Relational & Fixed Schema (SQL)
- Data is normalized and split across multiple tables
- Every table has a clearly defined data schema which enforces homogenous data records
- Examples: MySQL, PostgreSQL, Oracle SQL,...
Non-Relational & No Schema (NoSQL)
- Data is not normalized and only split across a few (or no) tables
- Tables don't enforce a fixed structure and allow for heterogenous data records
- Examples: MongoDB, DynamoDB,...

AWS gives lots of options:
- Different types of DATabases, eg, SQL vs NoSQL, different data or workload requirements favor different database types -> AWS allows you to run & use  all database types
- Different Hosting Options: Self-Hosted vs Managed, you can install + operate databases yourself (eg, on EC2 instances) or let AWS do that -> AWS supports both options

Self-Hosted - install & operate database software manually, eg, on EC2 instances, full control but also full responsibility, important duties: keep software patched, manage backups, etc
Managed Databased - Let AWS manage setup & database operations. Key Services: RDS, DynamoDB. Less control but also less responsibility. You define general rules but AWS does the heavy lifting.

## RDS - Relational Database Service
Managed SQL Databases
- Choose Database Engine - MySQL, PostgreSQL, then version, the auto-update settings
- Choose Hardware & Network Configuration - Instance Class (hardware profile), VPC, subnet & security group. Similar to EC2 instance setup (you can imagine AWS setting it up on EC2 instance)
- Configure Database Server - login credentials & port, Replication (for high availability & performance), monitoring settings, encryption & backup settings

Note: Replication creates replicas in different availability zones for high availability & performance. There can be a main rds instance and read replicas created in other availability zones.

## Amazon Aurora
Aurora is Amazon's own SQL database engine - MySQL & PostgreSQL compatible database engine with great scalability & performance. Amazon's own competitor to Postgres & MySQL.
There are two options - serverless & non-serverless. Serverless is more cost-effective and can be used if you don't need database online all the time. 

## Databases and VPCs
Common setup is for databases to be in a private subnet in your VPC, while the webserver running on EC2 is in a public subnet. Maybe a NAT gateway can be used for updating software on the database server. But setup will make sure requests from the internet are not possible to the database.

What is caching? - Storing data that is frequently requested in memory so that it can be retrieved quicker, than would be typically retrieved from a database, which needs to reach out to a file system under the hood.
AWS offers caching service with ElastiCache. You can choose database engine - Redis or Memcached, optionally enable cluster mode (for scaling), choose version, and configure hardware & network configuration - node type (hardware profile), VPC, subnet & security group. Then you have to configure Database Server - Encryption & backup settings, maintenance settings, and monitoring settings.

ElastiCache instance is called cluster. (which is different from the cluster mode option, but probably means cluster of 1 vs cluster of many.)

## DynamoDB
NoSQL Concept - No enforced schema, no cross-table relations, Instead: Values stored by key in a single table. With the right key & strategy, this can offer huge performance benefits.

DynamoDB is Amazon's own NoSQL database engine. Managed Solution.
Unlike RDS, you don't have to specify hardware profile, or network settings, all that is handled by AWS. You just create 'tables'. 
Process - Create tables - set name & key(s), set expected read / write capacities (or on demand option), choose encryption settings, then write and read data via AWS API, CLI or SDK. There's no query language like SQL for RDS. Then you can configure backups.

Advanced Features
- Streams - time-ordered series of database item changes, subscribe to process item changes
- Global Tables - fully mananged multi-region database, high availability thanks to automatic replication, great peformance thanks to global reach
- DAX - Managed in-memory cache for DynamoDB, accelerates database queries


## Other Database Services
MemoryDB - Persistent in-memory database
DocumentDB - Document (nested data structures) database, MongoDB compatible
Keyspaces - Wide column database (flexible column formats)
Neptune - Graph database (complex data relations)
Timestream - Time series database
Quantum Ledger Database - Immutable log of data changes


## AWS Backup
When setting up RDS, you can configure backups in creation process. But if you have lots of databases of different types, you can have a centralized backup management area through AWS Backup. 

Create centralized backup management with AWS Backup
Create Plan - use template or create custom, set frequency, retention period, etc, define destination & timeframe. 
Manage Resources & Backups - assign resources (eg, RDS cluster) to backup plan. Access & restore backups if necessary.


## Summary
- Different Database SErvices - Self-hosted (on EC2) vs managed services, SQL (RDS, Aurora) vs NoSQL (DynamoDB, DocumentDB), Different database for different workloads / data requirements
- RDS, Aurora & ElastiCache - Managed relational databse services, configure database cluster hardware, network & behavior. Leverage built-in scaling & availability (replicatioin) features, Access databases via HTTP endpoints / SQL queries
- DynamoDB & More - DynamoDB: Managed high-performance key-value database. Define partition keys & read / write capacity (or on-demand). Access DynamoDB data via AWS API / SDKs (no query language). Other databases for specific use-cases.



# Content Delivery  & Global Networking
Domain Name System -> translates domain names to IP addresses. There are many domain name registrars. AWS has one as well - AWS Route 53, you can register domain names and manage them there as well.

AWS Route 53 is a managed DNS service, its for managing and registering domain names. YOu an register or transfer domains. Create hosted zones for domains. 'Hosted Zone' is a group of DNS records (routing configuration for a domain name). Then you can manage DNS by creating routing records and manage failover or create complex routing rules. 

You can forward incoming requests to a custom domain to another service like an Application Load Balancer by creating A-type DNS record that uses an alias for routing traffic to an ALB.

## CDNs
Edge locations - which are smaller data centers distributed all over the world, IN ADDITION to the regions and availability zones. This is a network of data centers that exists outside the main data centers. These edge locations can receive, for example a website, from your main server, and cache it. AWS caches requested data in edge locations for future requests. This is to make sure latency stays low.

CloudFront is AWS's managed CDN. Uses AWS' Edge locations.
- Manage Content Origins - Create a distribution connected to content sources, define distribution behaviors, set logging, SSL & security settings.
- Deliver & Cache Content - Create caching policies (containing cache rules), connect caching policies to distribution, use functions for request / response manipulation

When using CloudFront with static site hosted on S3, that has an application load balancer, what should you choose for 'Original Domain' - the S3 bucket or the load balancer? Max used S3 bucket url. Then cloudfront gives you its own URL which represents the CloudFront distribution. Using that url means the content will be served from the nearest edge location. Is that that url we should point our domain to?


## Other Niche Parts of AWS Network in Addition to Regions (main data centers) and Edge Locations:
- Local Zones - Smaller AWS regions close to big metropolitan areas, perfect for achieving ultra-low latency, limited set of supported services, can extend VPCs to local zones
- Outposts - Add AWS infrastructure to your on-premises, AWS-managed infrastructure, limited set of supported services, can extends VPCs to outputs, for creating hybrid on-premises + cloud environment.
- Wavelength Zones - super small data centers running in 5G networks, AWS services embedded into 5G networks, perfect for achieving lowest latency possible, limited set of supported services, can connect to other services running in a region.


## Other Services that use the AWS network
- Global Accelerator - Can speed up network requests, Improve user traffic performance via AWS network. Receive two unique, stable IP addresses, use GA for balancing multi-region traffic. Will make sure incoming requests are routed to your load balancer or app as efficiently as possible through the AWS network.
- S3 Transfer Acceleration - Improve data transfer speed via AWS edge network. Less network variability, more bandwith utilization.
Global Accelerator and S3 Transfer Acceleration use AWS's own network (their own physical cables) to improve performance.

Global Accelerator also helps with high availability because it also functions as a load balancer. It monitors the application it should forward traffic to, and if the application becomes unhealthy, GA is capable of forwarding traffic to a healthy instance.


## AWS Certificate Manager
AWS Certificate Manager (ACM) allows you to manage SSL/TLS certificates for your applications. There is a dashboard for this in AWS, but you will often interact with this service from other services. Such as when using CloudFront, you have option to add SSL encrytion for the distribution and CloudFront will handle SSL termination - traffic from user to cloudfront will be encrypted, but traffic from cloudfront to your origin (edge location?) will be decrypted, since its running on Amazon's network at that point, not on public internet. 

Can add certificates for load balancers and other services as well. 


## Summary 
- Various Networking Services - VPC: Cloud-internal. Route 53: DNS service - register domains, define routes. CloudFront: CDN service, using AWS edge locations. Local Zones, Outposts, Wavelength: Extended regions. Global Accelerator, S3 Transfer Acceleration: Traffic acceleration.
- Route 53 & CloudFront - Register & manage domains with Route 53. Define request forwarding rules for (sub)domains. Use CloudFront for distributing (cached) content globally. Target (and 'wrap') other services with CF/Route 53. 
- AWS Network & Acceleration Services - Local Zones, Wavelength: Run services closer to your customers. Outposts: Run services closer to your infrastructure. Accelerate traffic or data (file) transfers with accelerators. 


# Beyond EC2: Serverless and Containers
Serverless Services - Services where you don't need to provision, configure and pay for servers. Instead, Define that task that should be performed and when it should be performed, like when an event occurs.

AWS Lambda is the main serverless compute service. 

(You can think of S3 as a serverless storage service)

Code - You upload or define the code that should be executed. Write code in console, upload zip file or Docker container. Choose a supported programming language. Advanced setup (eg, environment variables).
Event - Choose a supported event source. eg, a file was uploaded to S3, Advanced setup (eg. event filtering)
Configuration - Timeout, underlying architecture, file systems etc. Attach an execution role for permissions. Can connect to a VPC (it's NOT placed in there though)

## EC2 vs Lambda
- EC2 - spin up instances, install software & run your code. You can install & run any software. Good for running web server, run databases, etc. Extremely versatile & configurable. Does require lots of manual setup work & pay for uptime. 
- Lambda - Upload your code & define execution events. You can only execute code (can't install software). No easy way of running web servers, no databases. Focused on event-driven code execution. Almost no manual setup work required, & only pay for usage.

## Container Services
Container - packages of code AND the execution environment --> images, from which you can run containers.

You can have Single Image Applications (web server & database in one single image) or Multi Image Applications (web server & database in different images).

To run containers you need a server that's able to create + run containers, so a server with Docker installed.

## ECS - Elastic Container Service
Service that helps with deploying, running, managing & scaling containerized applications in clusters. ECS uses AWS' custom container cluster deployment solution. 

## EKS - Elastic Kubernetes Service
Service that helps with deploying, running, managing & scaling containerized applications in clusters. EKS uses Kubernetes as the container cluster deployment solution. 

Manually creating and managing clusters of servers (which run your containers) is very challenging, thats why ECS and EKS are used. 


## Setting Up Container Clusters
Define Cluster Structure - Define tasks: images & image configurations, Choose EC2 instances or Fargate as container host, Configure default network & security settings. 
Operate & Scale Containers - Define service/task specific settings, monitor containers, start or stop when needed.

Fargate - Serverless Container Execution Environment - you don't have to choose a hardware profile or EC2 instances, all that will be handled for you. (Recommended)

## ECR - Elastic Container Registry
ECR is Amazon's version of Docker Hub. You can create public or private repositories where images can be stored. 


## Summary
- Serverless & Containers - Alternative to EC2. Serverless: On-demand code execution (with a timeout). Containers: Packages of code + required execution environment. Different problems benefit from different solutions.
- AWS Lambda - SErverless, event-driven code execution. Provide code + define event triggers + execution configuration. Many supported event types (eg S3 file changes). Assign execution role for permissions. 
- ECS, EKS, ECR - Manged container clusters, help with running continaers. Provide images & environment configuration. Run on top of EC2 instances or Fargate (serverless).. Manage & distribute images with ECR.



# Building Serverless REST & GraphQL APIs
Web APIs -
REST - Request targets resource paths (eg. /books/1). Request entire data for a selected resource. Utilize HTTP verbs (GET, POST, ...). Extremely common
GraphQL - Request contains GraphQL query statement, request partial data, (only the data needed), POST requests only, popular because of reduced redundancy

## AWS API Gateway
API Gateway - allows you to build REST API without writing code.Managed REST API Service
- Define API Structure - Define resources (paths & HTTP methods). Enforce query parameters or authentication. Define response codes & schema.
- Handle Requests - Define rules for handlign & parsing requests. Configure response creation & forwarding logic. Handle real-time connections (websockets).
- Test and Deploy - Test during development. Deploy with stages.

API Gateway options - HTTP API, WebSocket API, REST API, etc (HTTP API is simpler version of REST API)


## AWS AppSync
AppSync - Managed GraphQL API Service
- Define schemas, queries & mutations, Connect schema to data sources & resolvers, add authentication.
- Handle Requests - Supports real-time and on-deamnad connections. Built-in query optimization & caching. 068c4f5cdf5167c818fc069ead73b7c1c8f32ead


## User Authentication with Cognito
Cognito - Managed App User Authentication Service
(This service is not about IAM users, although it can give IAM permissions. It's about giving your frontend apps a way to authenticate your users.)

Manage User Pools - Configure user credentials requirements, configure user authentication experience, integrate with your applications, assigns temporary IAM permissions to users. 
Allow Social Sign In - Create federated identity pool. Add Google, Facebook, Apple, etc authentication. Assigns temporary IAM permissions to users.

## Amplify  - Application Development Platform & Framework
Amplify is a set of tools aimed to make it easier to build web or mobile apps that embrace AWS and has backend and frontend capabilities. For non-AWS experts that want to use AWS for the backend of the app they are building. It uses all the other AWS services behind the scenes, so you don't have to create your own EC2 instances or databases. 

Provides frontend SDKs to integrate AWS backend services. Even if you are manually using AWS, you can still use these SDKs to integrate AWS services. Amplify is about simplifying process of writing frontend code to talk to your backend.

Amplify allows you to use Cognito from your frontend to create user authentication.

Focus on the Product - Don't focus on the underlying services. Creates infrastructure on your behalf (other services). Integrate with client side code via SDKs.
Build a Backend or Host an Application - Let Amplify manage services & app data. Use Amplify Studio to configure the backend. Manage data via Amplify Studio. 

## Summary
- Connecting Cloud Services to Frontend Apps - Many cloud services should be used by frontend apps. Typical frontend <-> backend communication uses HTTP APIs. REST & GraphQL APIs are common HTTP API solutions. API Gateway: Build serverless REST APIs. AppSync: Build serverless GraphQL APIs. 
- Building APIs - Define resources & request handling with API Gateway. CReate query definitions & schemas with AppSync. Define Lambda functions that 
should be executed. Handle requests without running your own API server. Implement user authentication with Cognito. 
- Simplifying the Cloud - Amplify is a platform that simplifies cloud app development. You can let Amplify create and manage AWS resources for you. Amplify also provides a complete CMS (Content Management System) if needed. Use the Amplify client-side SDK for frontend cloud integration.




# Simplifying Application Deployment via Elastic Beanstalk, LightSail and AppRunner
## Elastic Beanstalk - Simplified (Web) Application Deployment Service
(partially to compete with Heroku, whose goal is to make it easy to deploy apps.)
Configure web app environments in a single place, in a less overwhelming way.
- Create Applications & Environments - Define programming language & environment. Choose a preset & adjust as needed. Configure instance types, security settings & more, but in a less overwhelming way.
- Add load balancing, scaling & databases - add load balancing etc as needed. Add a connected database in the same creation wizard, all in a less overwhelming way.

## Lightsail - A Simplified EC2 Management Console
- Launch EC2 instances with a very simplified and user-friendly wizard. (Even simpler than Elastic Beanstalk)
- Focus on specific tasks (eg, install + configure Wordpress)

## AppRunner & Copilot - Simplifying Container Deployment
- AppRunner - A service that simplifies the process of deploying containers. Use ECS & Fargate under the hood.
- Copilot - A CLI that simplifies container app creation & deployment. Used to create cloud environments & deploy apps

## Summary
- Why Simplify? - Especially for beginners, AWS services can be challenging. Focus on the goal, instead of the tools. Goal: Make AWS more accessible to a broader audience. Not necessarily used by experts.
- Elastic Beanstalk & Lightsail: Elastic Beanstalk helps with creating EC2-based apps. Configure network, security, load balancing etc, on one screen. Add database if needed. Lightsail focuses on customers looking for a hosting provider.
- AppRunner & Copilot: AppRunner simplifies container deployment. Uses ECS etc under the hood. Copilot is a CLI for deploying containerized apps.
