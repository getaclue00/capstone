# capstone

Since [Issue #12](https://github.com/getaclue/capstone/issues/12) came around, we need to startup our servers binding to an ip and port (by default, we are using port 3000). Basically, the following way:
- from Ember dir: `ember s --proxy http://localhost:3000/`
- from Rails dir: `rails s -b 0.0.0.0`

Ofcourse, you can change the port if you wish. The only difference is for Rails, where you need to pass in the port parameter as a separate attribute. In other words, `rails s -b 0.0.0.0 -p 5555`
