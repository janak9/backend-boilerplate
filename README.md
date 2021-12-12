# Backend boilerplate
Backend setup/code structure designed by me with NodeJS, Express, MongoDB, GraphQL, Socket.

It also contains following setups:
- ES6 babel webpack
- ESLint
- Reusable code structure
- Logging mechanism
- Error/Response handling mechanism
- Corn jobs
- Swagger
- JWT
- AWS S3
- Upload files using multer
- Twilio to send OTP

# Steps to deploy code in EC2 using pm2:

## To start new pm2 service:
- Connect aws EC2
- Go to project folder
- pull/clone code
- Run `npm i`
- Run `npm run build`
- Run index file from dist folder using `pm2 start dist/index.js --name APP_NAME` and for cron `pm2 start dist/service.cron.js --name CRON_APP_NAME`

## Check server status
> pm2 status

## Check server logs
> pm2 logs `APP_NAME`
