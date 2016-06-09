// Change these variables
var slackBotToken = 'replace-me';
var toSearch = ['AAA-', 'A4B-', 'XYZ-']; // Your ticket prefixes, including the hyphen '-'
var baseUrl = 'https://my.example.net/browse/';

var Botkit = require('botkit');
var regexString = '^';
for (var i = 0; i < toSearch.length; i++)
  regexString += toSearch[i] + '[0-9]+|';
regexString = regexString.substring(0, regexString.length - 1);
var regex = new RegExp(regexString, 'g')

var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: slackBotToken,
}).startRTM();

controller.hears(toSearch, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  var thisMessage = message.match.input;
  var matched = thisMessage.match(regex);
  console.log(matched);
  if (matched != null)
    for (var i = 0; i < matched.length; i++) {
      var thisCode = matched[i];
      var thisUrl = baseUrl + thisCode;
      bot.reply(message, thisUrl);
    }
});
