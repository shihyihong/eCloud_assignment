"use strict";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

module.exports.get = async event => {
  try {
    const data = event.queryStringParameters.date;
    let date = new Date(data); // get date
    let first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6
    let firstday = new Date(date.setDate(first)).toISOString().slice(0, 10);
    let lastday = new Date(date.setDate(last)).toISOString().slice(0, 10);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      FilterExpression: "release_date between :start_date and :end_date",
      ExpressionAttributeValues: {
        ":start_date": firstday,
        ":end_date": lastday
      }
    };

    const result = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          movies: result.Items
        },
        null,
        2
      )
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err.message)
    };
  }
};
