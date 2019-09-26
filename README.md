eCloudvally Interview Assignment - Backend

#POST API
POST - https://6adljcu9ya.execute-api.ap-southeast-1.amazonaws.com/dev/movies
req.body = [
{
"ch_name": "ch_name",
"eng_name": "eng_name",
"expectation": "89%",
"intro": "intro",
"movie_id": "10195",
"poster_url": "poster_url",
"release_date": "2019-09-20",
"trailer_url": ""
}
]

res = {
message: "successfully insert",
matters: result.Items
}

#GET API  
GET - https://6adljcu9ya.execute-api.ap-southeast-1.amazonaws.com/dev/movies?date=2019-09-18

#Modify the date of url
#The format of date is ISO such as 2019-09-18
#res = all movie which release on the week which the date in

PUT(Update) - https://6sz0uw2lzl.execute-api.ap-southeast-1.amazonaws.com/dev/movies/{id}

req.body = {
any property you want to change : value
}

res = the row you update
