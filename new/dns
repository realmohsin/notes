# DNS Protocol

The Domain Name System is a distributed name service that provides a naming system for computers and other resources on the Internet. It translates easily memorable domain names into IP addresses needed for locating and identifying computer services using the underlying network protocols.


domain registrar
- company that sells domains and has servers that map domain name to nameserver

nameserver
- server where domain names are mapped to IP addresses. When a client request is made via domain name, the request goes to a nameserver where it gets a DNS record. The client then uses the DNS record to get the IP address to send the request to. 

Usually domain registrars have nameservers. When you get a domain you need to set the nameserver where you want the DNS records to be. (Initially the domain registrar will most likely have a fresh domain's nameserver  set to theirs by default). Then you need to set DNS records on the nameserver. (usually done through dashboard of company or service that owns nameserver.)

DNS records to set on nameserver
- A record will require a ipv4 address, which will be ip of host you want to point to. 
- AAAA record if host using ipv6 address
- CNAME record for pointing a domain to another domain's location (double check this)


Steps for buying domain
- choose domain registrar and buy domain from their dashboard
- choose company for nameserver and set location (IP address) of nameserver on domain registrar's dashboard
- on nameserver's company dashboard set DNS records, in other words, set the IP address of web server


Notes
- once you set an A record, all http requests to that domain are sent to port 80 of that host by default (and for https to port 443)

HTTP request path
- client ---> domain registrar ---> nameserver ---> web server