export default function sitemap() {
  const baseUrl = 'https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app/';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
