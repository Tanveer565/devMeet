# DEVMEET API LIST

API

## authRouter - Done
  - Post /signup
  - Post /login
  - Post /logout

## profileRouter - Done 
  - get   /profile/view
  - patch /profile/edit
  - patch /profile/password (Extra check required for it)

## connectionRequestRouter
  - Post /request/send/:status:/:userId(status:- either intersted or ignored)
  - Post /request/review/:status:/:requestId(status:- either accepted or rejected)



  - get  /request/review/accepted/:requestId
  - get  /request/review/rejected/:requestId

## uesrRouter
  - get  /user/connections
  - get  /user/reqests
  - get  /user/feed - gets you the profile of other user on the platform

  
