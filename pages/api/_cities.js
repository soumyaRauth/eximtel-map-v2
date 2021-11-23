export default (req, res) => {
  res.statusCode = 200;
  res.json({
"cities":[
        {
          "city": "DELHI",
          "population": "8,175,133",
          "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
          "state": "India",
          "region": "South Asia",
          "latitude": 24.720798906855872,
          "longitude": 77.94167410279117,
          "icon":["M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"],
          "size":40,
          "color":"#c1dcf6"
        },
        {
          "city": "Riyad",
          "population": "8,175,133",
          "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
          "state": "Saudi Arabia",
          "latitude": 25.075179026382486,
          "longitude": 44.6953718032302,
          "region": "Middle East Asia",
          "icon":["M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"],
          "size":50,
          "color":"#c1dcf6" 
        }
      ]
    
    })
  }


