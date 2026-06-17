import dns from "dns";
import mongoose from "mongoose";

// On some Windows dev setups (e.g. USB tethering where the primary adapter
// reports no DNS servers) Node's c-ares falls back to 127.0.0.1 and the
// mongodb+srv SRV lookup fails with ECONNREFUSED. Not needed in prod where
// /etc/resolv.conf is always correct — overriding there would bypass the
// cloud provider's internal resolver and break private DNS zones.
if (process.env.NODE_ENV !== "production" && dns.getServers().includes("127.0.0.1")) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ Missing MongoDB URI");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};
