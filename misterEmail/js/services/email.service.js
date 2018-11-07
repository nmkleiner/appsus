// import utilService from './util.service.js'

import storageService from './storage.service.js'
import utilService from './util.service.js'
// import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

const KEY = 'emailsKey';

function query(filter = null) {
    return storageService.load(KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = _createEmails();
                storageService.store(KEY, emails);
            }
            console.log('Cars: ', emails);
            if (filter === null) return emails;
            else return emails.filter(email => 
                email.subject.toUpperCase().includes(filter.bySubject.toUpperCase()))
        })
}

function getById(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailsIdx, 1);
            return storageService.store(KEY, emails);
        })
}


function saveEmail(email) {
    return storageService.load(KEY)
        .then(emails => {
            // Update
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                // Add
                email.id = utilService.makeId();
                emails.push(car);
            }
            return storageService.store(KEY, emails);
        });
}

export default {
    query,
    getById,
    deleteEmail,
    saveEmail
}

function _createEmails() {
    return ['one', 'two', 'three', 'four']
            .map( subject => (
                                {
                                    id: utilService.makeId(),
                                    body: utilService.makeLorem(100), 
                                    subject,
                                    isRead: Math.random() < 0.5
                                }
                            )
                )
}

