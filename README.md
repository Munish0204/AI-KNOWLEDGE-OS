# AI Knowledge OS

Project scaffold for the AI Knowledge OS application.

## Jenkins deployment

The Jenkins backend deployment requires a Jenkins **Secret text** credential with
the ID `mongo-uri` and the MongoDB connection string as its secret value. The
pipeline passes this credential to the backend container as `MONGO_URI`; do not
add database credentials to the repository or Docker image.

The Docker Hub publish stage requires a Jenkins **Username with password**
credential with the ID `docker-registry-creds`. Set the username to the Docker
Hub account name that owns the `muneeswaran02` image namespace, and use a Docker
Hub personal access token (with read/write access) as the password—not the
account password. If Docker Hub login reports `unauthorized`, replace or
regenerate the token and update this Jenkins credential before rerunning the
pipeline.
