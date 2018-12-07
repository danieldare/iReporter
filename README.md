# iReporter
iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public



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
$ npm run test
```

## Pivotal Tracker stories
[https://www.pivotaltracker.com/n/projects/2226824](https://www.pivotaltracker.com/n/projects/2226824)

## Template UI

You can see a hosted version of the template at [https://danieldare.github.io/iReporter/ui](https://danieldare.github.io/iReporter/ui)


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

