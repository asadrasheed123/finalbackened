const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 4883; // Specify the port you want to use

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  try {
    const apiKey = 'NmNkZGQwOTUtMmU2ZS00NzU0LWE0NTYtMDVmNjZjMmY1OTVk'; // Replace with your OneSignal API key
    const appId = 'f21c9e28-36d9-4a4e-9a27-397b8b7b59ff'; // Replace with your OneSignal App ID

    const { title, text, image } = req.body;

    const notification = {
      app_id: appId,
      included_segments: ['All'],
      contents: { en: text },
      headings: { en: title },
    };

    if (image) {
      notification.big_picture = image;
    }

    const response = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiKey}`,
      },
    });

    console.log('Push notification sent:', response.data);
    res.status(200).json({ success: true, message: 'Push notification sent successfully' });
  } catch (error) {
    console.error('Error sending push notification:', error.response.data);
    res.status(500).json({ success: false, message: 'Failed to send push notification' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
