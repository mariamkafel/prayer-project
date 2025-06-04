# prayer-project
description:
This project provides accurate prayer timings based on Lebanon’s time zone and precise prayer schedules. It serves as an API or a backend service that helps you know exactly when each prayer occurs throughout the day.
# features :
Provides accurate daily prayer times based on Lebanon’s local time.
User Authentication: Secure login system with password hashing and session management.
Responsive Design: still did not implement the frontend
RESTful API: Fully documented API for easy integration with other apps.
Error Handling: Clear error messages and robust error recovery.
Development tools included (like nodemon for automatic server restarts).
Passwords securely hashed with bcrypt for user security.
# Installation :
Prerequisites:
Node.js 
npm 

steps:
npm install

install the following framewarks:
express
install the following libraries:
bcrypt
jsonwebtoken
dotenv
cron
mysql2

install nodemon then :
rum npm  maryam 

# Configuration
This project uses environment variables to securely manage sensitive information, including database credentials and JWT secrets.
Create a `.env` file in the root directory of the project and add the following variables:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=time_prayer

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

# Contributing
contribution are allowed  
To contribute:  
1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature-name`.  
3. Make your changes and commit them: `git commit -m 'Add new feature'`.  
4. Push to the branch: `git push origin feature/your-feature-name`.  
5. Open a pull request.
For major changes, please open an issue first to discuss your ideas.

## License
This project is licensed under the MIT License. 

## Contact
mariam kafel
Email:mariam.kafel@lau.edu