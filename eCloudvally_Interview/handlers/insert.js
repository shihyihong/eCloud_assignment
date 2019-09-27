"use strict";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

module.exports.insert = async event => {
  try {
    const data = JSON.parse(event.body);
    data.forEach(movie => {
      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: movie
      };
      dynamoDb.put(params).promise();
    });
    const params = {
      TableName: process.env.DYNAMODB_TABLE
    };
    let result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "successfully insert",
          movies: result.Items
        },
        null,
        2
      )
    };
  } catch (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
    return {
      statusCode: err.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err.message)
    };
  }
};
