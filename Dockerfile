FROM node:9.6.1

# Link current directory to /usr/src/app
ADD . /usr/src/app

# Change current directory
WORKDIR /usr/src/app

# Expose server port
EXPOSE 3001

# Allow localy installed npm packages to be run
# without specifying the path to it
ENV PATH="${PATH}:./node_modules/.bin"

# Start the app
CMD ["npm", "start"]
