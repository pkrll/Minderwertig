# Data structures & socket communication

## Socket Messages

###### Client messages

* ``client/login``
    * Data: [``login``](#login)
* ``client/order/request``
    * Data: [``order request``](#order-request)
* ``client/trip/confirmation``
    * Data: [``trip confirmation``](#trip-confirmation)

###### Driver messages

* ``driver/login``
    * Data: [``login``](#login)

###### Dispatcher messages

* ``dispatcher/login``
* ``dispatcher/trip/proposal``
    * Data: [``trip``](#trip)

###### Server messages

* ``login/success`` (**Driver/Client**)
    * Data: [``account``](#account)
* ``login/success`` (**Dispatcher**)
    * Data: { orders: [[ ``order request`` ]](#order-request), trips: [[ ``trip`` ]](#trip), vehicles: [[ ``vehicle`` ]](#vehicle) }
* ``login/failure``
    * Data: { message: ``String`` }
* ``order/request`` (**Dispatcher only**)
    * Data: [``order request``](#order-request)
* ``trip/proposal`` (**Client only**)
  * Data: [``trip``](#trip)
* ``trip/new``
  * Data: [``trip``](#trip)

### Order / Booking system

* When the user books a taxi, a ``client/order/request`` message is sent to the server, along with an [``order request``](#order-request) object.

* The client will be redirected to a wait screen, where the order can be cancelled. This action will send a ``client/order/cancel`` message.

* The order is passed from the server on to the dispatchers to handle. When a taxi has been assigned to the order, the dispatcher sends a ``dispatcher/trip/proposal`` with a [``trip``](#trip) object.

* The user must confirm the trip by sending a ``client/trip/confirmation`` message, with an [``trip confirmation``](#trip-confirmation) object.

* If the user confirms the trip, it should be saved to the users trips. The server should also add it to the array containing ongoing trips. Otherwise, the order should just be removed.

## Data Structures

#### Account

###### Account (Client)

```json
{
  "id": Int,
  "email": String,
  "password": String,
  "metadata": {
    "name": String,
    "image_url": String,
    "position": {
      "x": Double,
      "y": Double
    },
  },
  "trips": [Trip]
}
```

###### Account (Driver)

```json
{
  "id": Int,
  "username": String,
  "password": String,
  "metadata": {
    "name": String,
    "image_url": String,
    "position": {
      "x": Double,
      "y": Double
    },
  },
  "assignments": [Trip],
  "vehicle": Vehicle
}
```

###### Vehicle
```json
{
  "name": String
}
```

#### Order / Trips

###### Order request

```json
{
  "route": {
    "from": String,
    "to": String,
    "time": Int
  },
  "duration": Int,
  "client": Account
}
```

###### Trip confirmation
```json
{
  "id": Int (The trip id),
  "response": Boolean
}
```

###### Trip

```json
{
  "id": Int,
  "price": Double,
  "route": {
    "from": String,
    "to": String,
    "time": Int
  },
  "duration": Int,
  "client": Account,
  "driver": Account
}
```
