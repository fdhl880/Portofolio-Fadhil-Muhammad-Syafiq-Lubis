export default function robots() {
  const baseUrl = 'https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
