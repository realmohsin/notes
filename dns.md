domain registrar - has domains to sell
nameservers - serves DNS records where domain names are mapped to ip addresses
usually domain registrars have nameservers. 
when you get a domain you need to set the nameserver where the DNS records will be. (initially the domain registrar will most likely have it set to their nameserver by default)
then you need to set DNS records on the nameserver. (usually done through dashboard of company or servic that owns nameserver)
A record will require a ipv4 address, which will be ip of host you want to point to. 
AAAA record if host using ipv6 address
CNAME record for pointing a domain to another domain's location (double check this)
other records - do research

once you set an A record, all http requests to that domain to be sent to port 80 of that host by default (and https to 443)

HTTP request path
client ---> domain registrar ---> nameserver ---> web server
