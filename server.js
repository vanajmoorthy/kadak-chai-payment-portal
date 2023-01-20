// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const YOUR_DOMAIN = "http://localhost:4242";

app.get("/", (req, res) => {
	res.render("./index.html");
});

app.post("/create-checkout-session", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: "price_1MS9wnIPGzg1rVnfWRXMH6Ml",
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${YOUR_DOMAIN}/success.html`,
		cancel_url: `${YOUR_DOMAIN}`,
	});

	res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
