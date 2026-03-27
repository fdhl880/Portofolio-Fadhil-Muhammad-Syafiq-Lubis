export default function sitemap() {
  const baseUrl = 'https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app'; // Replace with actual domain if different
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
