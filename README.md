## How to run the setup

step 1 : Install the docker setup by following https://www.docker.com/get-started (if you already have a  setup to run a yml file please skip this step)

Step 2: Clone the repository (dev branch for the latest updates)

Step 3: Find the .env.sample file and rename it as .env. (Here the DB credentials are given, but in real scenarios it should be created from your end for more security)

Step 4: run the docker compose file, and your APIs are up and running along with postgres running in a separate docker container.
            use command : docker-compose up --build
Step 5: To interact with the APIs you can use postman or any similar tools. All the APIs along with sample input is provided here. 
[https://www.postman.com/melwinsunnyjo/workspace/public/collection/19386160-cbb643bc-ebd5-4f4d-85fb-d65122266ebc?action=share&creator=19386160]

## Please note
1. Everything is set up in Docker
2. APIs are listed in Postman. 

##Improvements
1. Unit tests aren't complete.
2. All the APIs were tested manually.
3. Dockerizing everything was for showcasing the scalability and ease  of production level deployment.

## Details of APIs
Please see the detailed doc in : https://documenter.getpostman.com/view/19386160/2s9YR83Y6y