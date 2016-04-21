# Marije Dekker
import csv, json
with open('Map.csv', 'r') as csvfile:
    mapreader = csv.reader(csvfile, delimiter=';', quotechar='|')
    points = []
    for row in mapreader:
    	points.append(row)
with open('data.txt', 'w') as outfile:
    json.dump(points, outfile)
