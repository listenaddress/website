const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: "us20",
});

export default async function handler(req: any, res: any) {
    const { email } = req.body;
    console.log('Request for access from:', email)

    try {
        await client.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
            email_address: email,
            status: "subscribed",
        });

        res.status(201).json({ message: "Success" });
    } catch (error: any) {
        console.log("Error for email:", email)
        console.log("The error:", error.response.text)
        res.status(500).json({ error: error });
    }
}

