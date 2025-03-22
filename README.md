# README

## Approach and Findings
1. **Approach**: 
    - Analyzed the API documentation to understand the endpoints, parameters, and response structure.
    - Designed a script to automate API requests and handle pagination (if applicable).
    - Parsed and stored the API responses for further analysis.
    - Validated the data to ensure accuracy and completeness.

2. **Findings**:
    - Successfully retrieved and processed the data from the API.
    - Identified key insights and patterns in the data.
    - Have 3 verions and the prefix is varying upto first 3 characters
    - Time taken by one response - `169ms`
    - Request processed (Without Rate Limiting) - `100`

## Tools and Scripts
- **Scripts**: 
  - Created a backent using the `Axios && Expressjs` library for API interaction.
  - Used `generate.js` for prefix generation.
  - Implemented error handling to manage API rate limits and unexpected responses.

- **Tools**:
  - Postman for initial API exploration and testing.
  - Expressjs,body-parser and Axios are used.

## Total Number of Requests
- The total number of API requests made: [18768*3]

## Total Number of Records
- The total number of records obtained from the API: [[v1]-10009,[v2]-4345,[v3]-3417]

## How to Run the Script
1. Clone the repository.
2. Install the required dependencies using `npm i`.
3. Run the server using `npx nodemon server.js`.
4. For frontend run `npm run dev`.

## Notes
- Ensure you have a valid API key (if required) and update the script accordingly.
- Refer to the API documentation for any additional configuration.
