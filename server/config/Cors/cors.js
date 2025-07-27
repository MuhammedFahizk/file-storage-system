// const allowlist = [process.env.CLIENT_URL, "https://file-storage-system-labz.vercel.app/user/" , "http://localhost:8000"];
// export const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowlist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS",process.env.CLIENT_URL));
//     }
//   },
//   credentials: true,
//   exposedHeaders: ["WWW-Authenticate"],
// };


export const corsOptions = {
  origin: "*", // Allow all origins
  // credentials: true,
  // exposedHeaders: ["WWW-Authenticate"],
};