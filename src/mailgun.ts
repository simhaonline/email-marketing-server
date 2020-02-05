import mailgun from 'mailgun-js';

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

export const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
