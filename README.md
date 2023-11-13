# LinkedIn Referrals CRUD Application

## Overview

This application serves as a platform for managing LinkedIn connections and referrals. It provides users with the ability to keep track of their LinkedIn contacts, mark favorites, add comments to each contact, and manage these contacts through a user-friendly interface.

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `localhost:8080`

## Features

- **Manage Connections**: View and manage your LinkedIn connections in a streamlined list.
- **Add Comments**: Easily add comments to each LinkedIn contact for personal notes and reminders.
- **Favorite Contacts**: Mark contacts as favorites for quick access.
- **CRUD Operations**: Create new contacts, read existing contact details, update favorite status, and delete contacts.
- **Responsive UI**: User-friendly and responsive interface for managing contacts.

## Technologies

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB (assumed from the use of Mongoose)
- Additional Libraries: Mongoose, Passport.js (for authentication)

## Installation

1. Clone the repository.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:<port_number>` (replace `<port_number>` with the port number specified in your application).

## Usage

1. **Login/Signup**: Use the login/signup feature to access your personal dashboard.
2. **View Contacts**: All LinkedIn contacts are displayed in a list with options to mark as favorite, add comments, or delete.
3. **Add a Contact**: Add new LinkedIn contacts with details like name, phone, and email.
4. **Manage Contacts**: Click on the comment icon to add or view comments, the envelope icon to mark/unmark as favorite, and the trash icon to delete a contact.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

[MIT License](LICENSE.md) (Assuming you're using MIT, replace with your chosen license)

## Credit

Modified from Scotch.io's auth tutorial
