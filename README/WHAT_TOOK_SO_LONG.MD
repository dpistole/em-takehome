### [Back To README](../README.md)

## What Took So Long

Estimating things is hard, I've been in tech for over a decade and I still struggle. In my opinion there is an optimal point between under-planning, where you might make a costly mistake from a time perspective, and over-planning where your time spent thinking would be better spent executing.

There were a few decisions during this exercise that in hindsight I might have made differently.

### app routing

Having done my planning in Figma, I assumed I would need 8 pages to accomplish the user story functionality. I probably could have just jammed everything onto a single page with no routes, kept the code separated by components, and then implemented and moved the components into separate pages after the fact. It would have saved me the ~90 minutes it took to setup the router and scaffold the pages.

### api client code

I think there is some slight over-engineering to my api client code (`src/lib/api-sdk`) where I defined custom hooks, that wrap `react-query` hooks, that take separate fetch functions, that use a common fetch wrapper, etc. I'm using constants for the route paths, and functions to generate the path itself to provide room for parameters where needed (but which were not needed).

In hindsight I probably could have just dropped the `react-query` hooks right into the components, used free ranging strings as the API paths, and duplicated code where needed. I think that might have reduced the time to completion by ~60 minutes, but it's hard to say because I've trained myself to abstract for reusability, use constants, etc, and deviating from those muscle memories would also cause some delay.

### redundant ui

Mainly with the Accounts page, where the user story says: 

> "The customer must be able to view their accounts connected with the company and the balances associated with each account."

I might be able to get by with just the Accounts List on the home page, and without the `list accounts page` or the `view account page` (though ultimately that one seemed required as a place to view transactions)

### code quality

Overall I think I probably could have sacrificed some of the code quality, maybe using less constants, or paying less attention to the positioning of elements or font weights. I think what I produced is about the bare minimum of what I would be comfortable with quality wise in a real world scenario (not accounting for all of the `what i didnt do` stuff)


