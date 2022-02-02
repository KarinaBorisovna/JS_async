'use strict'

class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
  }

  addClock(time, callback, alarmId) {
    if (!alarmId) {
      throw new Error('ID не передан');
    }
    if (this.alarmCollection.find((element) => element.alarmId === alarmId)) {
      return console.error('Звонок уже существует');
    }
   
    this.alarmCollection.push({time, callback, alarmId});
  }

  removeClock(alarmId) {
    let arrLength = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter(
        (element) => element.alarmId !== alarmId);

    if (arrLength === this.alarmCollection.length) {
        return false;
    } else {
        return true;
    }

    // корректен ли такой способ?
    // let result = this.alarmCollection.filter((element) => elenemt.alarmId === alarmId);
    // if (result === -1) {
    //   return false;
    // } else {
    //   this.alarmCollection.splice(result, 1);
    // return true;
    // }
  }

  getCurrentFormattedTime() {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    return `${hours}:${minutes}`;
  }

  start() {
    const checkClock = (alarmClock) => {
      if (alarmClock.time === this.getCurrentFormattedTime()) {
        alarmClock.callback();
      }
    }
    if (this.timerId === null) {
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach((alarmClock) => checkClock(alarmClock));
      }, 10000);
    }
  }

  stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
    this.timerId = null;
  }

  printAlarms() {
    this.alarmCollection.forEach((alarmClock) => 
      console.log(`Будильник №${alarmClock.timerId} заведен на ${alarmClock.time}`));
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
} 

function testCase() {
  let phoneAlarm = new AlarmClock();
  phoneAlarm.addClock('09:00', () => console.log('Пора вставать'), 1);

  phoneAlarm.addClock('09:01', () => {
    console.log('Давай, вставай уже!'); 
    phoneAlarm.removeClock(2);
  }, 2);

  phoneAlarm.addClock('09:02', () => {
    console.log('Вставай, а то проспишь'); 
    phoneAlarm.clearAlarms(); 
    phoneAlarm.printAlarms();
  }, 3);

  phoneAlarm.addClock('09:03', () => console.log('Вставай, а то проспишь'), 1);
  phoneAlarm.printAlarms();
  phoneAlarm.start();

}

testCase();
