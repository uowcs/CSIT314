# NOMNOMNOW

## **Run Using Docker**

**Pre-installation Preparations**

Clone the Repository:

`git clone https://github.com/uowcs/csit314`

`cd csit314`

**Installation Process**

Follow these steps to install and run the project using Docker:

1. Run Docker Compose:

- Ensure you are in the directory containing the compose.yml file.
- Execute the following command to start the Docker containers defined in the compose.yml file:

`docker compose up −d`

- The -d flag runs the containers in detached mode, allowing you to use the terminal for other commands.

2. Verify Containers are Running:

- After running the above command, check that all containers are

running properly by executing:

`docker compose ps`

- This command lists all running Docker containers. Verify that the

containers specified in your compose.yml file are listed.

3. Access the Application:

- Once the containers are running, you can access the application. The specific URL and port to use will depend on the configuration in the compose.yml file. Typically, you can access it via

`http://localhost:3000`

**Post-installation**

1. Check Logs: If there are any issues, you can check the logs of a specific container using:

`docker compose logs <service−name>`

Replace <service-name> with the name of the service defined in your compose.yml file (e.g., web).

2. Stopping Containers: When you need to stop the containers, use the following command:

`docker compose down` 