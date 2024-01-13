# Bike Rental Application Overview

## Technologies Utilized

### Backend
- **Nest.js**
- **TypeORM**
- **SQLite3**
- **Joi** for validation

## User Roles

There are two user roles in the system: Regular User and Manager.

### Manager Privileges

Managers have the following capabilities:
- Create, Read, Update, and Delete bikes.
- Manage users and managers: Create, Read, Update, and Delete.
- View a comprehensive list of users who reserved bikes, including the reservation period.
- Access details of all bikes reserved by users, along with the corresponding reservation periods.

### User Functionalities

Regular users can perform the following actions:
- View a list of all available bikes for specific dates.
- Apply filters based on model, color, location, or rate averages.
- Reserve a bike for a specific period.
- Provide a rating for the rented bike on a scale from 1 to 5.
- Cancel a reservation.
