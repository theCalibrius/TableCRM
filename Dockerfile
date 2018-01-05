FROM node:6.10.2-alpine

# Create app directory
RUN mkdir -p /code
WORKDIR /code
ADD . /code

# Install app dependencies
# For npm@5 or later, copy package-lock.json as well
COPY package.json yarn.lock ./

RUN npm install -g -s --no-progress yarn && \
	yarn && \
	yarn run build && \
	yarn run prune && \
	yarn cache clean

# Bundle app source
COPY . .

CMD [ "yarn", "start"]

EXPOSE 8080

