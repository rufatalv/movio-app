/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "encrypted-tbn0.gstatic.com",
      "image.tmdb.org",
    ],
  },
};

module.exports = nextConfig;
