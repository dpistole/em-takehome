 - the mock API is understandably lacking authentication and authorization logic, I assume we would be using httpOnly cookies (or a token, depending on use case) in a real world scenario

 - for the "view account page" I would expect to be able to request a specific account from the API (either by url param or in the request body), but since the mock API only supports the accounts list currently I've used that and filtered the results client side

 the same would apply to getting the transactions, I would expect to be able to call an API endpoint that would return the (probably paginated) list of transactions for a given account id