var prettyMs = require('pretty-ms');
var clc = require('cli-color');

function prettify(ms) {
  return prettyMs(ms, {secDecimalDigits: 2});
}

function prettifyVerbose(ms) {
  return prettyMs(ms, {verbose: true, secDecimalDigits: 2});
}

function botSay(phrase) {
  console.log(clc.red('Bot: ') + phrase);
}

function userSay(phrase) {
  console.log(clc.blue('You: ') + phrase);
}

function print_stats(start_time, total_ms, num_solves, ao5, ao12, ao_session, best_time, worst_time) {
  console.log('Session statistics');
  console.log('Session started at ' + start_time);
  console.log('You have been cubing for ' + prettifyVerbose(total_ms));
  console.log('Total solves: ' + clc.blue(num_solves));

  if(best_time !== undefined) {
    console.log(clc.green('Best solve: ') + clc.blue(prettifyVerbose(best_time)));
  }

  if(worst_time !== undefined) {
    console.log(clc.green('Worst solve: ') + clc.blue(prettifyVerbose(worst_time)));
  }

  var ret = {solve: 0, inspect: 0};

  if(num_solves >= 5) {
    console.log('Your current ' + clc.red('AO5') + ' is ' + clc.blue(prettifyVerbose(ao5)));
    ret.solve++;
    ret.inspect++;
  }
  if(num_solves >= 12) {
    console.log('Your current ' + clc.red('AO12') + ' is ' + clc.blue(prettifyVerbose(ao12)));
    ret.solve++;
    ret.inspect++;
  }

  console.log('Your current ' + clc.red('Session average') + ' is ' + clc.blue(prettifyVerbose(ao_session)));

  return ret;
}

exports.prettify = prettify;
exports.prettifyVerbose = prettifyVerbose;
exports.botSay = botSay;
exports.userSay = userSay;
exports.print_stats = print_stats;
