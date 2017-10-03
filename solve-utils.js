var prettyMs = require('pretty-ms');
var clc = require('cli-color');

var charm = null;

function getCharm() {
  if(charm === null) {
    charm = require('charm')();
    charm.pipe(process.stdout);
    charm.reset();
  }

  return charm;
}

/**
 * Shortcut function to write msg at specific location
 * @param {number} posX
 * @param {number} posY
 * @param {string} msg
 */
function writeAt(posX, posY, msg) {
  charm.position(posX, posY);
  charm.write(msg);
}

function writeLines(msgArray) {
  if(!Array.isArray(msgArray)) {
    return;
  }

  charm.position(function (curX, curY) {
    for(var msg of msgArray) {
      charm.position(0, curY);
      charm.write(msg);
      charm.down(1);
    }
  });
}

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
  writeLines([
    'Session statistics',
    'Session started at ' + start_time,
    'You have been cubing for ' + prettifyVerbose(total_ms),
    'Total solves: ' + clc.blue(num_solves)
  ]);

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

var start_inspect = 5; //TODO: get rid of magic numbers
var start_solve = 6;

function getStartInspect() {
  return start_inspect;
}

function setStartInspect(value) {
  start_inspect = value;
}

function getStartSolve() {
  return start_solve;
}

function setStartSolve(value) {
  start_solve = value;
}

function getRightRowNum() {
  return 50;
}

function eraseInspectSolveLines() {
  charm.position(1, start_inspect);
  charm.erase('end');

  charm.position(1, start_solve);
  charm.erase('end');
}

function writeIntroduction() {
  botSay("Hey! Let's start solving!");
  botSay('The session starts now!');
}

function addControlsHint() {
  var right_row_num = getRightRowNum();

  writeAt(right_row_num, 1, clc.green('Keyboard shortcuts (press e to exit)'));
  writeAt(right_row_num, 2, clc.red('Press space to initiate a solve.'));
  writeAt(right_row_num, 3, clc.blue('Press letter s to see your session statistics.'));
}

exports.getCharm = getCharm;
exports.writeAt = writeAt;
exports.writeLines = writeLines;
exports.prettify = prettify;
exports.prettifyVerbose = prettifyVerbose;
exports.botSay = botSay;
exports.userSay = userSay;
exports.print_stats = print_stats;
exports.getStartInspect = getStartInspect;
exports.setStartInspect = setStartInspect;
exports.getStartSolve = getStartSolve;
exports.setStartSolve = setStartSolve;
exports.getRightRowNum = getRightRowNum;
exports.eraseInspectSolveLines = eraseInspectSolveLines;
exports.writeIntroduction = writeIntroduction;
exports.addControlsHint = addControlsHint;
