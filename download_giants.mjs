import fs from 'fs';
import https from 'https';

const images = [
    { name: 'newton', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/600px-Sir_Isaac_Newton_%281643-1727%29.jpg' },
    { name: 'einstein', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1947.jpg/600px-Einstein_1947.jpg'},
    { name: 'jobs', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/600px-Steve_Jobs_Headshot_2010-CROP2.jpg' },
    { name: 'musk', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/600px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    { name: 'gates', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/600px-Bill_Gates_2018.jpg' },
    { name: 'buffett', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg/600px-Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg' },
];

images.forEach(img => {
    https.get(img.url, (res) => {
        const file = fs.createWriteStream(`public/images/giants/${img.name}.jpg`);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${img.name}.jpg`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${img.name}:`, err);
    });
});
