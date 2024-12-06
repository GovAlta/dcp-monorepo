#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function post(url, access_token, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`  
        },
        body: JSON.stringify(data)
    });
}

(async function run() {

const args = process.argv;
const env = args[2] || 'uat';
const configPath = path.join(__dirname, `configs/${env.toLowerCase()}.config.json`);

console.log("reading configs for env:", env, "config path:", configPath);

const envConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, `configs/${env}.config.json`), 'utf8'));
const input = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/input.json'), 'utf8'));

const uuids = [];
const migratedServices = [];

let access_token;

if (input?.services?.length > 0) {
    try {
        const token = await fetch(`${envConfigs.token_base_url}/auth/realms/${envConfigs.realm}/protocol/openid-connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${envConfigs.client_id}&client_secret=${envConfigs.client_secret}`
        }).then(res => res.json());

        access_token = token.access_token;
    } catch (e) {
        console.log("error occurred during login", e);
    }

    try {
        let serviceListings = await fetch(`${envConfigs.value_service_url}/${envConfigs.value_service_name_space}/values/${envConfigs.value_service_listing_name}?top=1`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(res => res.json());

        serviceListings = serviceListings?.data?.[envConfigs.value_service_name_space]?.[envConfigs.value_service_listing_name]?.[0]?.value?.index;

        if (input?.services?.length > 0 && (!serviceListings || serviceListings?.length === 0)) {
            const services = input.services;

            for (let i = 0; i < services.length; i++) {
                const service = services[i];
                const appId = crypto.randomUUID();
                const updatedService = {...service, appId};

                await post(`${envConfigs.value_service_url}/${envConfigs.value_service_name_space}/values/${appId}`, access_token, updatedService);

                uuids.push(appId);
                migratedServices.push({...updatedService, migrated: true});
            }
        }
    } catch (e) {
        console.log("error occurred during migration", e);   
    }

    try {
        if (uuids.length > 0) {
            await post(`${envConfigs.value_service_url}/${envConfigs.value_service_name_space}/values/${envConfigs.value_service_listing_name}`, access_token, { index: uuids });
            fs.writeFileSync(path.join(__dirname, 'data/output.json'), JSON.stringify({...input, services: migratedServices}));
            fs.writeFileSync(path.join(__dirname, 'data/remaining.json'), JSON.stringify({...input, services: migratedServices.filter(s => !s.migrated)}));
        }

        console.log("successfully migrated list of services", migratedServices.length, migratedServices);
    } catch (e) {
        console.log("error occurred during cleanup", e);   
    }
} else {
    console.log("no services to migrate");
}
})();