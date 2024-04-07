import MongoClient from 'mongodb'
import { NextResponse } from 'next/server';
const { MongoClient } = require("mongodb");


export async function POST(request){ 

let body = await request.json();
// Replace the uri string with your connection string.
const uri = "mongodb+srv://nainghtet0123:j9yumg8HxZ1lSThP@sfsu2024.5vhnv57.mongodb.net/?retryWrites=true&w=majority&appName=SFSU2024";

const client = new MongoClient(uri);


  try {
    const database = client.db('data');
    const values = database.collection('values');

    // Query for a movie that has the title 'Back to the Future'

    const data = await values.insertOne(body);

    return NextResponse.json({ok:true, data})

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

