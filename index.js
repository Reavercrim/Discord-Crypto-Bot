'use strict';

require('dotenv').config();

const fetch = require('node-fetch');

const Discord = require('discord.js');
const btc = new Discord.Client();
const eth = new Discord.Client();

let apiData = { BTC: { USD: "N/A" }, ETH: { USD: "N/A" } };

let api = async () => {
    try {
        const response = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD', {
            method: 'get',
            headers: { 'Authorization': 'Apikey '+ process.env.CC_KEY },
        });
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
};

let format = (data) => {

}

setInterval(async () => {
    apiData = await api()
}, 30000);

btc.once('ready', () => {
    console.log('Ready!');
    setInterval(() => {
        btc.user.setActivity(apiData['BTC']['USD'].toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',','\'') + " USD", { type: 'WATCHING' })
    }, 30000)
});

eth.once('ready', () => {
    console.log('Ready!');
    setInterval(() => {
        eth.user.setActivity(apiData['ETH']['USD'].toLocaleString(undefined, {minimumFractionDigits: 2}).replace(',','\'') + " USD", { type: 'WATCHING' })
    }, 30000)
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
btc.login(process.env.BTC_TOKEN);
eth.login(process.env.ETH_TOKEN);


