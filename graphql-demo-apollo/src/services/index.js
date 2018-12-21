import serviceAuthors from './serviceAuthors'
import serviceBooks from './serviceBooks'
import serviceComments from './serviceComments'
import serviceUsers from './serviceUsers'

const services = {
    Authors: serviceAuthors,
    Books: serviceBooks,
    Comments: serviceComments,
    Users: serviceUsers,
};
global.services = services;

module.exports = services;