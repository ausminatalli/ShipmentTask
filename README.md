
# Pixel Shipment

This app was build using nodejs,expressjs,reactjs


Please change your mysql credentials In
```bash
/backend/config/config.json.
```
Lets start by running the below command for backend
```bash
cd backend && npm install
# Then
npm run dropDB && npm run createDB && npm run migrateDB
# Then
npm run start
```
for Frontend
```bash
cd client && npm install
# Then
npm run start
```

### Note:

To access admin route change isadmin to true
in database
