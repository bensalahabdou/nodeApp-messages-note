// import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { alreadyExisted, getMessages, addMessage, removeMessage, updateMessage } from './message.js';

const error = chalk.black.bgRed.underline.italic.bold;
const warning = chalk.hex('#FFA500');


const argv = yargs(hideBin(process.argv)).argv

let sender = argv.sender
let message = argv.message
let old = argv.old
let command = argv._[0]

// console.log(argv.sender)
// console.log(argv.message)
// console.log(command)

let hello = getMessages()
console.log('messages', hello)


if (command === 'add'){
    addMessage({sender, message})
}

if (command === 'remove'){
    const tab= getMessages()
    const isExist= alreadyExisted(tab, message)
    if (isExist){
        removeMessage(message)
    }else{
        throw warning('you have to put an existing message')
    }
    
}


if (command === 'update'){
    const tab= getMessages()
    const isExist= alreadyExisted(tab, old)
    console.log('is',isExist)
    if (isExist){
        updateMessage(old, message)
    }else{
        throw warning('This message does not exist ...')
    }
    
}


let hi = getMessages()
console.log('newMessages', hi)


