# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import gedcom
import requests
import json

gedcomfile = gedcom.parse("Le Sage Family Tree(2).ged")

base = "https://maps.googleapis.com/maps/api/geocode/"
formt = "json"
key = "AIzaSyCaXQ2Ke4ykbHhLQGkx0eHqQYdpst1HHaM"

output = []

json_id = 0

for person in gedcomfile.individuals:
    try:
        
        birth = requests.get(base+formt+"?address=" + person.birth.place + "&key="+key).json()
        death = requests.get(base+formt+"?address=" + person.death.place + "&key="+key).json()
        
        birth_addr = birth['results'][0]['formatted_address']
        birth_loc = birth['results'][0]['geometry']['location']
        
        death_addr = death['results'][0]['formatted_address']
        death_loc = death['results'][0]['geometry']['location']

        output.append ({
            'id': json_id,
            'gedcom_id': person.id,
            'name': person.name,
            'birth_addr': birth_addr,
            'birth_loc': birth_loc,
            'birth_date': person.birth.date,
            'death_addr': death_addr,
            'death_loc': death_loc,
            'death_date': person.death.date })
        
        json_id += 1
        
    except:
        print("~~~ Nothing ~~~")

f=open('ancestry.json','w')
x = json.dumps(output, indent=4)
f.write(x)
f.close()