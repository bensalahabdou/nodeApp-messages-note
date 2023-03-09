import * as fs from 'fs';
import chalk from 'chalk';

const error = chalk.black.bgRed.underline.italic.bold;
const warning = chalk.hex('#FFA500');

export function getMessages(){
    const data = fs.readFileSync('messages.txt','utf8');
return  JSON.parse(data)
} 

const alreadyExist= (tab, el) => {
    const item = tab.filter(b => b.message === el.message)
    if (item.length > 0) {
        return true
    }else{
        return false;
    }
}

export const alreadyExisted= (tab, el) => {
    const item = tab.filter(b => b.message === el)
    if (item.length > 0) {
        return true
    }else{
        return false;
    }
}

export const addMessage= (newMessage) => {
    const tableOfMessages = getMessages() 
    let isExist = alreadyExist(tableOfMessages, newMessage);
    console.log(isExist)
    if (!isExist){
        tableOfMessages.push(newMessage)
        const newTableMessages = JSON.stringify(tableOfMessages)
        fs.writeFileSync('messages.txt', newTableMessages, (err)=>{
            if (err) throw err;
            console.log('updating successfully')
        })
    }else{
        throw error('message is already exist, you should write an other message')
    }
}


export const removeMessage = (message) => {
    const tabMessages = getMessages()
    const items = JSON.stringify(tabMessages.filter(b => b.message !== message))
    
    fs.writeFileSync('messages.txt', items, (err)=>{
        if (err) throw err;
    })
    
}

export const updateMessage = (oldMessage, newMessage)=>{
    const tabMessages = getMessages()
    let messageToUpdate = tabMessages.find(b => b.message === oldMessage)
    let items = tabMessages.filter(b => b.message !== oldMessage)
    messageToUpdate.message = newMessage
    items = [...items, messageToUpdate]
    fs.writeFileSync('messages.txt', JSON.stringify(items), (err)=>{
        if (err) throw err;
    })

}




