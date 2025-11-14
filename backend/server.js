const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const Sentry = require("@sentry/node");
const connectDB = require("./utils/connectDB");
const apiRoutes = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

dotenv.config();
connectDB();

const app = express();

// Sentry init
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
app.use(Sentry.Handlers.requestHandler());

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

// Routes
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req, res) => res.send("Server is running"));

// 404 middleware
app.use(notFound);

// Error handler
app.use(errorHandler);
app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
