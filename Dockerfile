# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app's source code into the container
COPY . .

# Expose the port on which your app runs
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
