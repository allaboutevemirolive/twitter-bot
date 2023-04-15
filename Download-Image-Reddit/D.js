const imageUrl = 'https://preview.redd.it/ep5t9xnwkrta1.jpg?width=640&crop=smart&auto=webp&s=a9ca070c3e80160803e701610dec5a7fabfb2884';
const filename = 'reddit-image.jpg';
downloadImage(imageUrl, filename);
function downloadImage(url, filename) {
    fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        });
}
