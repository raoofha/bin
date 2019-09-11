#!/bin/bash

#wget -q https://source.unsplash.com/featured/1920x1080/?animals,people,nature,landscape,forest -O ~/pictures/unsplash.com.jpg
wget -q https://source.unsplash.com/featured/1920x1080/?animals,nature,landscape,forest -O ~/pictures/unsplash.com.jpg
feh --bg-center ~/pictures/unsplash.com.jpg
