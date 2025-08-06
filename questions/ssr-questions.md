## Questions

1. What is SSR, or Server Side Rendering?
2. What is Client Side Rendering?
3. What is a Single Page Application?
4. What is Create-React-App?
5. What is hydration?
6. What is NextJs?
7. How can you create a new NextJs project?
8. How do you set up module path aliases in a NextJs project?
9. What is the App Router in NextJs?
10. What is a layout file in NextJs?
11. What is a page file in NextJs?
12. In addition to the layout and page files, what other files have a special meaning in the app router? (Answer: loading, not-found, error and route. Talk about how not-found and error files are essentially ErrorBoundaries and Suspense components wrapping the page component)
13. What are route groups in the context of the App Router?
14. How do you create routes where a route segment can be dynamic in the App Router?
15. What is a Root Layout and can you have multiple Root Layouts?
16. What is Dynamic Rendering in NextJs?
17. What is Static Rendering, or Prerendering in NextJs?
18. What are Server Components?
19. What are Client Components?
20. What is Streaming in the context of NextJs, and what are the benefits?
21. What is Prefetching in the context of NextJs and how is it done with respect to dynamically and statically rendered pages?
22. What is the React Server Component Payload?
23. How does the Link component handle browser page load on navigation?
24. Can you summarize the features of the Link component?
25. How are routes with dynamic segments rendered? Can they be cached or prerendered?
26. What are params and searchParams? How do you use them and how do they affect rendering?
27. When should you use Server Components, and when should you use Client Components?
28. Are Client Components rendered on the server?
29. What are the benefits of using Server Components over Client Components?
30. Explain the full process of how HTML is generated and shown to the user in a NextJs app that is using a mix of server and client components.
31. How is the RSC Payload used when requesting a page and in the context of repeat navigations?
32. What are the rules or limitations for passing props from a server component to a client component and why are they necessary?
33. What are the rules or limitations for how nesting can happen between server and client components? What are the best practices around this?
34. What can you do if you need to nest a server component in a client component? Give some examples of situations where you might want to do this.

What is the benefit of server side rendering?
How does SEO factor into the SSR vs CSR discussion?

- If your NextJs application is working in development, but in production it seems like mutations are not updating data, what could be the issue? (In development, every route is dynamically rendered, but in production...finish answer)
- What does serializable mean?
- How do you flash cookies in NextJs?
- If you have a header or navbar that uses cookies to get authentication status, every page with the navbar will be dynamic. What can you do if you want to utilize static rendering?