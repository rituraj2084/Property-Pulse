/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Specifies the allowed external image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', //Restricts images to this specific domain.
        pathname: '**', // The wildcard (**) allows images from any path on this domain.
      },
    ],
  },
};

export default nextConfig;
