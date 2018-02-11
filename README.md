![](hero.jpg)
# Minderwertig
A taxi booking system created as a student project for the course *System Design with a User Perspective* at Uppsala University.

Minderwertig is a web application (Javascript/Vue).

### Getting started

#### Prerequisites

* Node and the node package manager

#### Installing

Clone this repository:

```bash
$ git clone https://github.com/pkrll/Minderwertig
```

``cd`` in to the folder, and run npm install in the ``App/`` directory to install the project dependencies.

```bash
$ cd Minderwertig/App
$ npm install
```

### Usage

**Minderwertig** consist of a server, and three applications: A client app, a driver app and a dispatcher.

#### Running the server

In the ``App/`` folder, run the command ``node app`` to start up the server.

#### Running the client

The client application is reached from ``localhost:PORT/client`` where ``PORT`` is the port number set in the [``config.js``](#configurations) file.


#### Running the driver

The driver application is reached from ``localhost:PORT/driver`` where ``PORT`` is the port number set in the [``config.js``](#configurations) file.


#### Running the dispatcher

The dispatcher application is reached from ``localhost:PORT/dispatcher`` where ``PORT`` is the port number set in the [``config.js``](#configurations) file.

### Configurations

Configurations can be found in the ``config.js`` file:

* ``Port`` (default: 1335)
