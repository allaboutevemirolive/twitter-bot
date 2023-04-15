from bs4 import BeautifulSoup

data = '''
<h3 class="_eYtD2XCVieq6emjKBH3m">Name one bad one.</h3>

<img alt="Post image" class="_2_tDEnGMLxpM6uOa2kaDB3 ImageBox-image media-element _1XWObl-3b9tPy64oaG6fax" src="https://preview.redd.it/7s35fes4vsta1.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;v=enabled&amp;s=229f0cbdcf9a7af8b790a2d99e8316487d22c5f3" style="max-height:512px">

<h3 class="_eYtD2XCVieq6emjKBH3m">We're two brothers making our first Steam game. It's like Gorogoa meets Monument Valley. Search for 'Paper Trail' on Steam and wishlist if you like it! ❤️❤️❤️</h3>

<img alt="Post image" class="_2_tDEnGMLxpM6uOa2kaDB3 ImageBox-image media-element _1XWObl-3b9tPy64oaG6fax" src="https://external-preview.redd.it/Uv3xcZWKi1b3-sdFFI96cO3esyjusrVH3-2EGRnsywA.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;v=enabled&amp;s=1cd6123734efb08c4f65fb1bde79dc8c757e10bf" style="max-height:512px">
'''

soup = BeautifulSoup(data, 'html.parser')
filtered_data = []

for tag in soup.find_all(['h3', 'img']):
    if tag.name == 'h3':
        filtered_data.append(tag.text.strip())
    elif tag.name == 'img':
        filtered_data.append(tag['src'])

print(filtered_data)
