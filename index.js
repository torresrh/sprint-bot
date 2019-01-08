CHANNEL: team-engineering-test
BOTNAME: sprint-bot
AUTH: xoxb-77716408935-518681602181-tFuKbWUTDKYDnggff8qna74s

// Each engineer needs a gitlab field and username populated.
// for each user in team-engineering add only users with gitlab field and value !==null
// then add that username to the users array

//users = ["abrongersma-navi"]


// first
// for each user 
// ask user what's working and what's not working.



// 2nd
// for each user in users 
// grab last three issues from gitlab




//poll = {
 // sprint: 24,
 // username: abrongersma-navi,
 // issues: [12,22,32],
 // working: ["Things are good"],
 // notWorking: ["this bot sux"]
//}


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('../lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});