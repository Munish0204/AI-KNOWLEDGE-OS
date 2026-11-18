# AI Knowledge OS

Project scaffold for the AI Knowledge OS application.

## Jenkins deployment

The Jenkins backend deployment requires a Jenkins **Secret text** credential with
the ID `mongo-uri` and the MongoDB connection string as its secret value. The
pipeline passes this credential to the backend container as `MONGO_URI`; do not
add database credentials to the repository or Docker image.
