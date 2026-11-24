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

The deployed frontend and backend containers use the `ai-network` Docker
network. The frontend Nginx configuration proxies `/api/*` to
`http://ai-backend:8000`.

## EC2 ECR deployment

Create the backend environment file on the EC2 host before starting the
container:

```bash
sudo mkdir -p /home/ubuntu/ai-knowledge-config
sudo bash -c 'cat > /home/ubuntu/ai-knowledge-config/backend.env <<EOF
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=<new-random-secret>
GEMINI_API_KEY=<key>
OPENAI_API_KEY=<key>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
EOF'
sudo chmod 600 /home/ubuntu/ai-knowledge-config/backend.env
```

Then recreate the containers on a shared Docker network:

```bash
sudo docker network create ai-network 2>/dev/null || true
sudo docker rm -f ai-backend ai-knowledge-frontend 2>/dev/null || true

sudo docker run -d \
  --name ai-backend \
  --restart unless-stopped \
  --network ai-network \
  --env-file /home/ubuntu/ai-knowledge-config/backend.env \
  -p 8000:8000 \
  882638355979.dkr.ecr.ap-south-1.amazonaws.com/ai-knowledge-backend:latest

sudo docker run -d \
  --name ai-knowledge-frontend \
  --restart unless-stopped \
  --network ai-network \
  -p 3000:80 \
  882638355979.dkr.ecr.ap-south-1.amazonaws.com/ai-knowledge-frontend:latest

sudo docker logs --tail 100 ai-knowledge-backend
```
