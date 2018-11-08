// import utilService from './util.service.js'

import storageService from "./storage.service.js";
import utilService from "./util.service.js";
// import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

const KEY = "emailsKey";

function query(filter = null) {
  return storageService.load(KEY).then(emails => {
    if (!emails || !emails.length) {
      emails = _createEmails();
      storageService.store(KEY, emails);
    }
    if (filter === null) return emails;
    else {
      console.log(filter.emailStatus)
      if (filter.emailStatus === 0) {
        return emails.filter(email => email.subject.toUpperCase().includes(filter.text.toUpperCase()))
        
      }
      
      return emails.filter(email => email.subject.toUpperCase().includes(filter.text.toUpperCase()))
      .filter(email => email.isRead === filter.emailStatus);
    }
  });
}

function getById(emailId) {
  return storageService.load(KEY).then(emails => {
    return emails.find(email => email.id === emailId);
  });
}

function deleteEmail(emailId) {
  return storageService.load(KEY).then(emails => {
    var emailIdx = emails.findIndex(email => email.id === emailId);
    emails.splice(emailIdx, 1);
    return storageService.store(KEY, emails);
  });
}

function saveEmail(email) {
  return storageService.load(KEY).then(emails => {
    // Update
    if (email.id) {
      var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id);
      emails.splice(emailIdx, 1, email);
    } else {
      // Add
      email.id = utilService.makeId(7);
      emails.push(email);
    }
    return storageService.store(KEY, emails);
  });
}

export default {
  query,
  getById,
  deleteEmail,
  saveEmail
};

function _createEmails() {
  var emails = [];
  for (var i = 0; i < 20; i++) {
    var subject = utilService.makeLorem(20)
    emails.push(subject);
  }

  return emails.map(subject => ({
    id: utilService.makeId(7),
    body: utilService.makeLorem(4000),
    subject,
    isRead: Math.random() < 0.5,
    timeSent: Date.now() - utilService.getRandomInt(2000000,100000000) 
  }));
}
