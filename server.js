require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4242;

const YOUR_DOMAIN = `http://localhost:${PORT}`;

app.get("/", (req, res) => {
	res.render("./index.html");
});

app.post("/create-checkout-session", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
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

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
