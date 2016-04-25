# Marije Dekker
import csv, json
with open('studenten.csv', 'r') as csvfile:
    mapreader = csv.reader(csvfile, delimiter=';', quotechar='|')
    points = []
    for row in mapreader:
    	points.append(row)
with open('studenten.txt', 'w') as outfile:
    json.dump(points, outfile)