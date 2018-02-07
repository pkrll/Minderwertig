# Data structures & socket communication

### Socket Messages

###### Client messages

* ``client/login``
    * Data: [``login``](#)
* ``client/order/request``
    * Data: [``order request``](#)
* ``client/order/confirmation``
    * Data: [``order confirmation``](#)

###### Driver messages

* ``driver/login``
    * Data: [``login``](#)

###### Dispatcher messages

* ``dispatcher/login``
* ``dispatcher/order/proposal``
    * Data: [``order proposal``](#)

###### Server messages

* ``login/success`` (**Driver/Client**)
    * Data: [``account``](#)
* ``login/success`` (**Dispatcher**)
    * Data: { orders: [[ ``order request`` ]](#), trips: [[ ``trip`` ]](#), cars: [[ ``car`` ]](#) }
* ``login/failure``
    * Data: { message: ``String`` }
* ``order/request`` (**Dispatcher only**)
    * Data: [``order request``](#)
* ``order/proposal`` (**Client only**)
  * Data: [``order proposal``](#)

## Order / Booking system

When the user books a taxi, a ``client/order/request`` message is sent to the server, along with an ``order request`` object, detailed below:

###### Order request

```json
{
  "route": {
    "from": String,
    "to": String,
    "time": Int
  },
  "client": Account
}
```

This data is passed to the dispatchers, who in turn sends back an ``order proposal``:

###### Order proposal

```json
{
  "id": Int,
  "price": Double,
  "route": {
    "from": String,
    "to": String,
    "time": Int
  },
  "driver": Account
}
```

##### Trip

```json
{
  "id": Int,
  "price": Double,
  "route": {
    "from": String,
    "to": String,
    "time": Int
  },
  "client": Account,
  "driver": Account
}
```


## 1. Containers
#### Server  
* accounts[]

#### Client  
* account

#### Driver  
* account

## 2. Objects
#### account  
* __int__ uuid  
* __int__ x, y  
* __metadata__ agent  
* trips[]

#### metadata  
* __string__ name  
* __string__ url  
* ...

#### trip  
* __int__ uuid  
* __address__ from, to  
* __metadata__ agent  
* __status__ status

#### status  
* __enum__ WAITING  
* __enum__ ACCEPTED  
* __enum__ DENIED  
* __enum__ ACTIVE  
* __enum__ PAUSED  
* __enum__ TERMINATED

## 3. Sockets
### Send

#### login  
*Send a login request from client or taxi to the server.*  
* __string__ username  
* __string__ password

#### order  
*Send an order (trip) to the server.*  
* __address__ from, to  
* __date__ date  
* ...

#### confirmation  
*Send a confirmation on a trip to the server.*  
* __int__ uuid  
* __status__ status

#### location
*Send your current location to the server.*  
* __int__ uuid  
* __int__ x, y

### Receive

#### login  
*Receive a login object containing an account object if login was successful.*  
* __status__ status  
* __account__ account

#### trip
*Receive a trip from the server if earlier sent confirmation contains status ACCEPTED.*  
* __trip__ trip
