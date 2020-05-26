const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const PostSQLdb = require('../config/database')
const Event = require('../models/event')
const User = require('../models/user')
const Participation = require('../models/participation')
const Position = require('../models/position')
const Course = require('../models/course')
const UserCourses = require('../models/user_course')
const { Op } = require('sequelize')


//Associations

User.hasMany(Participation,
    {
        as: 'ParticipationRef',
        foreignKey: 'id_user'
    })
Participation.belongsTo(User,
    {
        as: 'UserRef',
        foreignKey: 'id_user'
    });

Event.hasMany(Participation,
    {
        as: 'ParticipationRef',
        foreignKey: 'id_event'
    })
Participation.belongsTo(Event,
    {
        as: 'EventRef',
        foreignKey: 'id_event'
    });

Position.hasMany(Participation,
    {
        as: 'ParticipationRef',
        foreignKey: 'id_position'
    })
Participation.belongsTo(Position,
    {
        as: 'PositionRef',
        foreignKey: 'id_position'
    });

User.hasMany(UserCourses,
    {
        as: 'UserCoursesRef',
        foreignKey: 'id_user'
    })
UserCourses.belongsTo(User,
    {
        as: 'UserRef',
        foreignKey: 'id_user'
    });

Course.hasMany(UserCourses,
    {
        as: 'UserCourses',
        foreignKey: 'id_course'
    })
UserCourses.belongsTo(Course,
    {
        as: 'CourseRef',
        foreignKey: 'id_course'
    });




router.get('/', (req, res) =>
    Event.findAll()
        .then(events => {
            console.log(events)
            res.status(200)
        })
        .catch(err => console.log(err)));


// Add user to database
router.post('/addUser', (req, res) => {
    let userData = req.body
    if (userData.email == "" || userData.password == "" || userData.name == "" || userData.surname == "" || userData.phoneNumber == "") {
        res.send('Ensure all necessery data are provided');
    }
    else {
        User.findOne({ where: { email: userData.email } })
            .then(result => {
                if (result) { res.status(200).json({ message: "Email is aready taken" }) }
                else {
                    User.findOne({ where: { phone_number: userData.phoneNumber } })
                        .then(result => {
                            if (result) { res.status(200).json({ message: "Phone number is already taken" }) }
                            else {
                                User.create({
                                    name: userData.name, surname: userData.surname, email: userData.email,
                                    address: userData.address, phone_number: userData.phoneNumber
                                })
                                    .then(createdUser => {
                                        res.status(201).json({
                                            message: "User added to db",
                                            userId: createdUser.id
                                        })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error adding the person"
                            });
                        })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error adding the person"
                });
            })

    }
})

// Add event do database
router.post('/addEvent', (req, res) => {
    let eventData = req.body
    if (eventData.title == "" || eventData.city == "" || eventData.start_date == null || eventData.end_date == null || eventData.amount_of_people == null) {
        res.send('Ensure all necessery data are provided')
    }
    else {
        Event.create({
            title: eventData.title, city: eventData.city, start_date: eventData.start_date,
            end_date: eventData.end_date, amount_of_people: eventData.amount_of_people
        })
            .then(createdEvent => {
                res.status(201).json({
                    message: "Event added successfully",
                    eventId: createdEvent.id
                });
            });
    }
})

// Add one course from the user
router.post('/addCourseOfUser', (req, res) => {
    let courseData = req.body
    if (courseData.id_user == null || courseData.id_course == null) {
        res.send('Data is null error')
    }
    else {
        UserCourses.create({
            id_user: courseData.id_user, id_course: courseData.id_course
        })
            .then(createdCourse => {
                res.status(201).json({
                    message: "User course added successfully",
                    courseId: createdCourse.id
                });
            });
    }
})

// Get all events from database
router.get('/getEvents', (req, res) => {
    Event.findAll({ raw: true }).then(event => {
        console.log(event);
        res.status(200).json({
            message: 'Events received',
            events: event
        });
    });
});

// Get all completed events from database
router.get('/getCompletedEvents', (req, res) => {
    Event.findAll({
        where: {
            end_date: {
                [Op.lt]: new Date()
            }
        }
    }).then(event => {
        console.log(event);
        res.status(200).json({
            message: 'Events received',
            events: event
        });
    });
});

// Get all users from database
router.get('/getUsers', (req, res) => {
    User.findAll({ raw: true }).then(user => {
        console.log(user);
        res.status(200).json({
            message: 'Users received',
            users: user
        });
    });
});

// Get all participants information from selected event
router.get('/getUsersForEvent/:id', (req, res) => {
    Participation.findAll({
        where: { id_event: req.params.id }, attributes: ['id', 'id_user', 'salary'],
        include: [{ model: User, as: "UserRef", attributes: ['name', 'surname', 'phone_number'] },
        { model: Position, as: "PositionRef", attributes: ['name'] }],

    })
        .then(user => {
            console.log(user);
            res.status(200).json({
                message: 'Users received',
                users: user
            });
        });
});

// Get all participations from logged user
router.get('/getParticipations/:email', (req, res) => {

    User.findOne({ where: { email: req.params.email } })
        .then(result => {
            Participation.findAll({
                where: { id_user: result.id },
                include: [{ model: Event, as: "EventRef" }]
            })
                .then(participation => {

                    res.status(200).json({
                        message: 'Participations received',
                        participations: participation
                    });
                });
        })
})

// Get positions data
router.get('/getPositions', (req, res) => {
    Position.findAll({ raw: true }).then(position => {
        console.log(position);
        res.status(200).json({
            message: 'Positions received',
            positions: position
        });
    });
});

// Get all courses
router.get('/getCourses', (req, res) => {
    Course.findAll({ raw: true }).then(course => {
        console.log(course);
        res.status(200).json({
            message: 'Users received',
            courses: course
        });
    });
});

// Delete selected user by email address
router.delete("/deleteUser/:email/:id", (req, res) => {

    Participation.destroy({ where: { id_user: req.params.id } })
        .then(result => {
            console.log("Participations deleted.")
        })
        .catch(err => {
            console.log(err)
        })

    UserCourses.destroy({ where: { id_user: req.params.id } })
        .then(result => {
            console.log("User's courses deleted.")
        })
        .catch(err => {
            console.log(err)
        })

    User.destroy({ where: { email: req.params.email } })
        .then(result => {
            res.status(200).json({ message: "User deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the user"
            });
        })
});

// Add new participation
router.post('/addParticipation', (req, res) => {

    // Find the user in PostresDB with email
    User.findOne({ where: { email: req.body.email } })
        .then(result => {
            // Find the user in database with user’s email and event’s id
            // If found send exception that user is already signed
            Participation.findOne({ where: { id_event: req.body.event, id_user: result.id } })
                .then(result2 => {
                    if (result2) {
                        res.status(201).json({
                            message: "You are already signed",
                        })
                    }
                    else {
                        Participation.count({
                            where: { id_event: req.body.event },
                            col: 'participations.id_event'
                        })
                            .then(function (count) {
                                if (count < req.body.amount) {
                                    Participation.create({
                                        id_user: result.id, id_event: req.body.event,
                                        id_position: req.body.position
                                    })
                                        .then(createdParticipation => {
                                            res.status(201).json({
                                                message: "Signed for an event",
                                                participationId: createdParticipation.id
                                            });
                                        });
                                }
                                else {
                                    res.status(201).json({
                                        message: "List is full",
                                    });
                                }

                            });
                    }
                })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error finding id the user"
            });
        })
});

// Update event by it's id
router.put('/updateEvent/:id', (req, res) => {
    const id = req.params.id;

    Event.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: "Event updated successfully!" });
            } else {
                res.send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with id=" + id
            });
        });
});

// Update participant salary by participation id
router.put('/updateSalary/:id', (req, res) => {
    const id = req.params.id;

    Participation.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: "Salary updated successfully!" });
            } else {
                res.send({
                    message: `Cannot update Salary with id=${id}. Maybe Salary was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Salary with id=" + id
            });
        });
});

// Delete event by selected event id
router.delete("/deleteEvent/:id", (req, res) => {
    Event.destroy({ where: { id: req.params.id } })
        .then(result => {
            res.status(200).json({ message: "Event deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the event with id: " + id
            });
        })
});

// Signing off the user from the event by deleting the participation
router.delete("/deleteParticipation/:id", (req, res) => {
    Participation.destroy({ where: { id: req.params.id } })
        .then(result => {
            res.status(200).json({ message: "Participation deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the pariticipation with id: " + id
            });
        })
});

// Add new position
router.post('/addPosition', (req, res) => {
    let positionData = req.body
    if (positionData.name == "") {
        res.send('Ensure all necessery data are provided')
    }
    else {
        Position.create({
            name: positionData.name
        })
            .then(createdPosition => {
                res.status(201).json({
                    message: "Position added successfully",
                    positionId: createdPosition.id
                });
            });
    }
})

// Delete position by selected position id
router.delete("/deletePosition/:id", (req, res) => {
    Position.destroy({ where: { id: req.params.id } })
        .then(result => {
            res.status(200).json({ message: "Position deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the position with id: " + id
            });
        })
});

// Get courses of user, by his id
router.get('/getCoursesOfUser/:id', (req, res) => {

    UserCourses.findAll({
        where: { id_user: req.params.id },
        include: [{ model: Course, as: "CourseRef", attributes: ['name'] }]
    })
        .then(result => {
            res.status(200).json({
                message: 'Participations received',
                userCourses: result
            });

        })
})

// Add new course
router.post('/addCourse', (req, res) => {
    let courseData = req.body
    if (courseData.name == null || courseData.price == null) {
        res.send('Data is null error')
    }
    else {
        Course.create({
            name: courseData.name, price: courseData.price
        })
            .then(createdCourse => {
                res.status(201).json({
                    message: "New course added successfully",
                    courseId: createdCourse.id
                });
            });
    }
})

// Delete selected course
router.delete("/deleteCourse/:id", (req, res) => {

    UserCourses.destroy({ where: { id_course: req.params.id } })
        .then(result => {
            res.status(200).json({ message: "User's course deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting user's course"
            });
        })

    Course.destroy({ where: { id: req.params.id } })
        .then(result => {
            res.status(200).json({ message: "Course deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the course with id: " + id
            });
        })
});


module.exports = router;