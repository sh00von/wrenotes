// pages/api/courses.js

export default function handler(req, res) {
    const courses = [
        {
          "level": 1,
          "terms": [
            {
              "name": "Term 1",
              "subjects": [
                {
                  "code": "WRE101",
                  "name": "Introduction to Water Resources Engineering",
                  "notes": [
                    { "title": "Lecture Notes", "url": "http://example.com/notes1" }
                  ]
                }
              ]
            }
          ]
        }
      ]
      
  
    res.status(200).json(courses)
  }
  