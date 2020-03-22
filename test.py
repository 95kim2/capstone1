import requests
import random
import time

for i in range(10):
    val = random.randrange(0, 51)
    url = 'https://api.thingspeak.com/update?api_key=W12BCJ9N07XFBZ3N&field1='+str(val)
    r = requests.get(url)
    time.sleep(30)
# r.encoding = 'utf8'
# print(r.text)
