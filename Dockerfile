FROM ubuntu:18.04

COPY . /starter
WORKDIR /starter

RUN apt update && apt install -y -q --no-install-recommends curl ca-certificates

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y -q --no-install-recommends nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install -y -q --no-install-recommends yarn 


RUN cd frontend && yarn install

RUN cd backend && yarn install

EXPOSE 8080 9090

CMD ./start.sh
