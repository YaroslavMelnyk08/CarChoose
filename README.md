# CarChoose

CarChoose is a web application designed to help users select and manage car advertisements. It provides features for filtering, creating, and managing car ads, as well as user authentication and profile management.

## Features

- User authentication and role-based access control
- Create, edit, and delete car advertisements
- Filter and search for cars based on various criteria
- Save favorite ads for quick access
- Admin panel for managing users and ads
- Responsive design for seamless use on different devices

## Project Structure

The project is divided into two main parts:

1. **Client**: The frontend of the application built with React.
2. **Server**: The backend of the application built with Node.js and Express.

### Client

Located in the `client/` directory, the frontend includes components, pages, and styles for the user interface.

### Server

Located in the `server/` directory, the backend includes routes, controllers, middleware, and models for handling API requests and database interactions.

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/YaroslavMelnyk08/CarChoose.git
   ```

2. Navigate to the project directory:
   ```bash
   cd CarChoose
   ```

3. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Set up the database:
   - Create a PostgreSQL database.
   - Populate the database by executing the commands from the `data.sql` file located in the `database queries and database file with car info/` directory.
   - The same directory contains a CSV file (`сar-database.csv`) with detailed car data, which can be used for reference or additional imports.
   - Configure the database connection in `server/db.js`.

5. Start the development servers:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd client
     npm start
     ```

6. Open the application in your browser at `http://localhost:3000`.

## Usage

- Register or log in to access the application.
- Browse and filter car advertisements.
- Create, edit, or delete your own ads.
- Save ads to your favorites for quick access.
- Admin users can manage all ads and users.

## Database Setup

To fill the database with car data, follow these steps:

1. Execute the commands from the `data.sql` file, which is located in the `database queries and database file with car info/` directory.
2. This folder also contains a CSV file (`сar-database.csv`) with detailed information about cars.

### CSV File Structure

The `сar-database.csv` file includes the following columns:

| Column Name         | Description                          |
|---------------------|--------------------------------------|
| `car_id`           | Unique identifier for the car        |
| `make`             | Manufacturer of the car              |
| `model`            | Model name                           |
| `generation`       | Generation of the model              |
| `year_from`        | Start year of production             |
| `year_to`          | End year of production               |
| `series`           | Series of the car                    |
| `trim`             | Trim level                           |
| `body_type`        | Type of car body (e.g., sedan, SUV)  |
| `number_of_seats`  | Number of seats                      |
| `engine_type`      | Type of engine (e.g., petrol, diesel)|
| `capacity_cm3`     | Engine capacity in cubic centimeters |
| `engine_hp`        | Engine horsepower                    |
| `drive_wheels`     | Drive wheels configuration           |
| `number_of_gears`  | Number of gears                      |
| `transmission`     | Type of transmission (e.g., manual, automatic) |

This data can be used to populate the database and provide a comprehensive dataset for the application.