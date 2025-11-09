import urllib.request
from urllib.parse import urlparse
from multiprocessing import Pool

def get_image(index):
    response = urllib.request.urlopen("https://source.unsplash.com/random")
    url = response.geturl()
    photo = urlparse(url).path.strip("/")

    print(index)

    if not photo.startswith("photo"):
        return None

    response = urllib.request.urlopen(url)
    if response.getcode() != 200:
        return None

    return photo.replace("photo-", "")

if __name__ == "__main__":
    with Pool(8) as pool:
        images = [x for x in pool.map(get_image, range(64)) if x is not None]

    print(len(images), "images")
    print(images[:32])
