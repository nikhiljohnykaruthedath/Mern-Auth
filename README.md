# MERN Auth Application

Features: 
- User can login and signup using their email address
- Their credentials are stored in MongoDB and encrypted
- On login, a JWT token is used to authorize the user and a cookie is set by the server 
- After login, the user has private routes like the profile page where they can update their details
- User can upload their profile image which is stored in Firebase
- OAuth is also implemented using Firebase 

## Production Website
https://mern-auth-bwdl.onrender.com/

## Usage
### 1. Run `npm install` under the /client folder followed by `npm run dev`
### 2. Run `npm install` under the /api folder followed by `npm run dev`

## Environment Variables
Please setup MongoDB and set the following environment variables:
- MONGO = ""
- JWT_SECRET = ""
