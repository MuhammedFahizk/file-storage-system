


export const corsOptions = {
  origin: (origin, callback) => {
    const allowlist = [
      "https://file-storage-system-labz.vercel.app",
      "http://localhost:3000",
    ];
    if (!origin || allowlist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Blocked by CORS: ${origin}`));
    }
  },
  credentials: true,
  exposedHeaders: ["WWW-Authenticate"],
};


