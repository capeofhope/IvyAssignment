const express=require('express');
const app=express();


const bodyParser=require('body-parser');
app.use(bodyParser.json()); 


const cors=require('cors');
app.use(cors());


const generate=require('./generate')

const prefix = generate();
const axios = require("axios");

const API_URL = "http://35.200.185.69:8000";
let MAX_CONCURRENT_REQUESTS = 10; // Start with 10 parallel requests
let REQUEST_DELAY = 100; // Start with 100ms delay between requests

const MAX_RETRIES = 3;
const MIN_DELAY = 50; // Minimum delay
const MAX_DELAY = 1000; // Max delay to prevent API overload
const BASE_PROCESS_TIME = 170; // API takes ~170ms per request

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const prefixes = generate(); // Modify for more queries
let allNames = new Set();
let uniqueNames = [];

// Function to fetch names with retry logic
const fetchNames = async (query, version, retries = MAX_RETRIES) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const startTime = Date.now();
            const response = await axios.get(`${API_URL}/${version}/autocomplete?query=${query}`);
            const endTime = Date.now();
            const processTime = endTime - startTime;

            if (response.status === 200 && Array.isArray(response.data?.results)) {
                return response.data.results;
            }
        } catch (error) {
            if (error.response?.status === 429) {
                console.warn(`⚠️ Rate limited on "${query}". Increasing delay to ${REQUEST_DELAY + 200}ms and retrying...`);
                REQUEST_DELAY = Math.min(REQUEST_DELAY + 200, MAX_DELAY); // Increase delay when rate-limited
                MAX_CONCURRENT_REQUESTS = Math.max(MAX_CONCURRENT_REQUESTS - 2, 1); // Reduce concurrency
                await sleep(REQUEST_DELAY);
            } else {
                console.error(`❌ Error fetching "${query}":`, error.message);
                return [];
            }
        }
    }
    return [];
};

// Process queries in limited batches
const processBatch = async (batch) => {
    const results = await Promise.allSettled(batch.map((query) => fetchNames(query, "v1")));

    results.forEach((res, index) => {
        if (res.status === "fulfilled" && Array.isArray(res.value)) {
            res.value.forEach((name) => allNames.add(name));
        } else {
            console.error(`⚠️ Failed or invalid response for "${batch[index]}"`);
        }
    });

    await sleep(REQUEST_DELAY);
};

// Function to extract all names
const extractNames = async () => {
    console.log("🚀 Starting name extraction...");

    for (let i = 0; i < prefixes.length; i += MAX_CONCURRENT_REQUESTS) {
        const batch = prefixes.slice(i, i + MAX_CONCURRENT_REQUESTS);
        await processBatch(batch);
        console.log(`✅ Processed ${i + batch.length}/${prefixes.length} prefixes...`);

        // Dynamically adjust delay & concurrency based on API speed
        if (REQUEST_DELAY > MIN_DELAY) {
            REQUEST_DELAY = Math.max(REQUEST_DELAY - 50, MIN_DELAY);
        }
        if (MAX_CONCURRENT_REQUESTS < 15) {
            MAX_CONCURRENT_REQUESTS += 1; // Slowly increase concurrency if stable
        }
    }

    console.log(`🎉 Total unique names collected: ${allNames.size}`);
};
app.get('/',async(req,res)=>{
    try {
        
        await extractNames();
        uniqueNames = [...allNames];
        res.json(uniqueNames);
    } catch (error) {
        console.log(error);
    }
});
app.get('/search',async(req,res)=>{
    const query=req.query.query;
    
    const data=await fetchNames(query);

    res.json(data.results);
});
app.listen(3000,()=>{
    console.log('Server started');
});
