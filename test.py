import json
import requests

URL = "http://localhost:8000/user"

req = requests.get(URL)

status_code = req.status_code

if status_code != 200:
    print(f"Error code : {status_code}")
    exit(0)

content = json.loads(req.content)
print(content['name'])