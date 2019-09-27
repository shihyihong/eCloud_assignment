"use strict";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
});
const isEmpty = require("../validation/isEmpty");
module.exports.update = async event => {
  try {
    const data = JSON.parse(event.body);
    if (!isEmpty(data)) {
      let attr = {};
      let exp = "SET ";
      let arr = Object.keys(data);

      arr.map(key => {
        attr[`:${key}`] = data[key];
      });

      arr.map(key => {
        exp += `${key} = :${key},`;
      });
      let exp1 = exp.replace(/.$/, "");
      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          movie_id: event.pathParameters.id
        },
        ConditionExpression: "attribute_exists(movie_id)",
        ExpressionAttributeValues: attr,
        UpdateExpression: exp1,
        ReturnValues: "ALL_NEW"
      };

      const result = await dynamoDb.update(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "update successfully!",
            movie: result
          },
          null,
          2
        )
      };
    } else {
      throw Error("Nothing should be updated !!!");
    }
  } catch (err) {
    console.error(
      "Unable to update item. Error JSON:",
      JSON.stringify(err.message, null, 2)
    );
    return {
      statusCode: err.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err.message)
    };
  }
};
