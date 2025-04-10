const twilio = require('twilio');
const accountSid = 'ACe3fe5fde04de132aaf123ab5db912347'; // starts with AC
const authToken = '4235bceec8a6893fefe0a98fcfa3560f';
const client = twilio(accountSid, authToken);

const fromNumber = 'whatsapp:+14155238886'; // Twilio sandbox number

const sendWhatsApp = async (toNumber, message) => {
  try {
    const fullNumber = 'whatsapp:+91' + toNumber; // change +91 if needed
    await client.messages.create({
      from: fromNumber,
      to: fullNumber,
      body: message
    });

    console.log('✅ WhatsApp sent to', toNumber);
  } catch (error) {
    console.error('❌ WhatsApp failed', error);
  }
};

module.exports = sendWhatsApp;
