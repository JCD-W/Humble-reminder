# Humble Reminder
A simple Kanban-style task organizer built with React and Express, containerized with Docker as a demonstration project.

The backend was built in Typescript using Express.JS with JWT Authentication, connecting to a MySQL database (without ORM). As for the Frotend it was made in React.JS and originally was designed in Figma. The application was designed with a single user in mind and without Email verification for the sake of simplicity.

This simple project took me a total of **32 days** to develope.
## Requirements
* Docker 29.2.0
* Git
## Running the system
```sh
# Clone the project
git clone https://github.com/JCD-W/Humble-reminder.git
cd Humble-reminder
# Build the images and run
docker compose build
docker compose --profile (dev or prod) up -d
# Stop
docker compose --profile (dev or prod) down
```
## Additional documentation
[API documentation](docs/api.md)

[Explanation behind the decitions](docs/explanations.md)