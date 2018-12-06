# iReporter

iReporter is an web platform that enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public and also report on things that needs government intervention.

# ireporter-backend
[![Build Status](https://travis-ci.org/danieldare/ireporter-backend.svg?branch=master)](https://travis-ci.org/danieldare/ireporter-backend)
[![Coverage Status](https://coveralls.io/repos/github/danieldare/ireporter-backend/badge.svg?branch=master)](https://coveralls.io/github/danieldare/ireporter-backend?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)


## Required Features

- Users can sign up
- Users can login
- Users can make a new report (A red flag or intervention)
- Users can edit their reports
- Users can delete their reports
- Users can add geolocation to their report
- Users can change the geolocation of their report
- Admin can change status of the report (drafted, under investigation, resolved, rejected)

## Technologies

- Node JS
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation
To install and run this project you would need to have installed:
- Node Js
- Git

To run:
```
$ git clone https://github.com/danieldare/iReporter.git
$ cd iReporter
$ npm install
$ npm start
```
## Testing
```
$ npm test
```

## Pivotal Tracker stories
[https://www.pivotaltracker.com/n/projects/2226824](https://www.pivotaltracker.com/n/projects/2226824)

## Template UI

You can see a hosted version of the template at [https://danieldare.github.io/iReporter/UI](https://danieldare.github.io/iReporter/UI)

## API

The API is currently in version 1 (v1) and is hosted at [https://ireporter-backnd.herokuapp.com/](https://ireporter-backnd.herokuapp.com/)

## API Endpoints

| Endpoint                                         | Functionality                            |
| ------------------------------------------------ | -----------------------------------------|
| GET /red-flags                                   | Fetch all red-flags reports              |
| GET /red-flags/\<red-flag-id>                    | Fetch the details of a single red-flag   |
| PATCH /red-flags/\<red-flag-id>/location         | Update the location of a red-flag report |
| PATCH /red-flags/\<red-flag-id>/comment          | Update the comment of a red-flag report  |
| DELETE /red-flags/\<red-flag-id>                 | Delete a single red-flag                 |

## Author

Daniel Oluwadare
