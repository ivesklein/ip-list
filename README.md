# IP-LIST

## Deploy

### Backend
- Run `npm install`
- Create the .env file and populate it
- Run `npm run build`

### Frontend
- Run `npm install`
- Create the .env file and populate it
- Run `npm run build`

### Service
- Create a service that runs the `/backend/dist/main.js` file
- Serve the static files in `/frontend/dist/`

## Integrtation
- To integrate this service with a third party it could be made in different ways:
  - Consuming the API
  - Creating a connection to a webhook on the third party side
  - Creeatin a connection compatible with the third party side
