const url = 'https://www.reddit.com/r/memes/comments/12lb7vt/hiring_managers_hate_this_one_trick/?utm_source=share&utm_medium=web2x&context=3';

fetch(url)
  .then(response => response.json())
  .then(json => {
    // Extract the media URL from the JSON response
    const mediaUrl = json[0].data.children[0].data.url_overridden_by_dest;
    
    // Make a request to the media URL and extract the binary data
    fetch(mediaUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a link element and trigger a download of the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'file';
        link.click();
      });
  });
