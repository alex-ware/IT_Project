# Adapted from https://www.digitalocean.com/community/tutorials/scrape-amazon-product-information-beautiful-soup
# Accessed 31.08.2022
# How to scrape Amazon Product Information Using Beautiful Soup
# Published by Meghna Gangwar on 04.08.2022

from cgi import print_exception
from ctypes import sizeof
from http.client import LENGTH_REQUIRED
import string
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
import time

# Connect to the database.
MONGO_URL="mongodb+srv://username:8lSW02qSgVdZG5fQ@team-45-cluster.usr52zy.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URL)
db = client['Team-45-Cluster']

# Function to extract Product Title
def get_title(soup):
	try:
		# Outer Tag Object
		title = soup.find("span", attrs={"id":'productTitle'}).string.strip()
	except AttributeError:
		title = ""	
	return title

## Function to extract Product Image
def get_image(soup):
	try:	
		image = soup.find("div", attrs={"class":'imgTagWrapper'}).find("img", attrs={"id": 'landingImage'})
		source = image['src']
	except AttributeError:
		source = ""
	return source

# Function to extract Product Price
def get_price(soup):
	try:
		price = (soup.find("span", attrs={'class':'a-price'}).find("span", attrs={'class': 'a-offscreen'})).string.strip()
	except AttributeError:
		try:
			# If there is some deal price
			price = soup.find("span", attrs={'id':'priceblock_dealprice'}).string.strip()
		except:		
			price = ""	
	return price

# Function to extract normal Product Price
def get_normal_price(soup):
	try:
		price = (soup.find("span", attrs={'class':'a-price a-text-price'}).find("span", attrs={'class': 'a-offscreen'})).string.strip()
	except AttributeError:
		price = ""	
	return price

# Function to extract Savings (%)
def get_savings(soup):
	try:
		savings = soup.find("span", attrs={'class':'a-size-large a-color-price savingPriceOverride aok-align-center reinventPriceSavingsPercentageMargin savingsPercentage'}).string.strip()
	except AttributeError:
		savings = ""	
	return savings

# Function to extract Product Description
def get_desc(soup):
	try:
		desc = soup.find("div", attrs={'id':'productDescription_feature_div'}).find("div", attrs={"id":"productDescription_feature_div"}).find('div', attrs={"class":'a-section a-spacing-small'}).find('span').string.strip()
	except AttributeError:
		desc = "Description Unavailable"	
	return desc

# Function to extract Product Rating
def get_rating(soup):
	try:
		rating = soup.find("i", attrs={'class':'a-icon a-icon-star a-star-4-5'}).string.strip()
	except AttributeError:
		try:
			rating = soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
		except:
			rating = ""
	return rating

# Function to extract Number of User Reviews
def get_review_count(soup):
	try:
		review_count = soup.find("span", attrs={'id':'acrCustomerReviewText'}).string.strip()
	except AttributeError:
		review_count = ""	
	return review_count

# Function to extract Availability Status
def get_availability(soup):
	try:
		available = soup.find("div", attrs={'id':'availability'})
		available = available.find("span").string.strip()
	except AttributeError:
		available = "Not Available"	
	return available	


if __name__ == '__main__':

	# Headers for request
	HEADERS = ({'User-Agent':
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
				'Accept-Language': 'en-US'})

	# The webpage URL
	URL_GPU = "https://www.amazon.com.au/s?k=graphics+card&i=computers&bbn=4913341051&rh=n%3A4913341051%2Cp_n_deal_type%3A10343590051%2Cp_72%3A2547915051%2Cp_n_feature_browse-bin%3A10500703051%7C10500708051%2Cp_n_feature_two_browse-bin%3A10584341051%7C10584342051%7C10584343051&dc&crid=1MQ53EYNQDXR7&qid=1664800346&rnid=10584318051&sprefix=%2Ccomputers%2C230&ref=sr_nr_p_n_feature_two_browse-bin_3&ds=v1%3AE0wCUNRHbNB5p9vpKzybRHtaGjb0yPwGOIHYQ5bJygA"
	URL_CPU = "https://www.amazon.com.au/s?k=cpus&i=computers&rh=n%3A4913338051%2Cp_72%3A2547915051%2Cp_n_feature_fourteen_browse-bin%3A4934772051%7C4934773051%2Cp_n_deal_type%3A10343590051&dc&crid=XDNM86WUW96O&qid=1664800414&rnid=10343588051&sprefix=cpu%2Ccomputers%2C257&ref=sr_nr_p_n_deal_type_1&ds=v1%3AU58qY6th0y9bQZ3k0i2OuQuzE%2F%2Bl7%2BmGIj7MYFKRnGs"
	URL_RAM = "https://www.amazon.com.au/s?k=ram&i=computers&bbn=4913350051&rh=n%3A4913350051%2Cp_n_deal_type%3A10343590051%2Cp_72%3A2547915051&dc&qid=1664800570&rnid=2547911051&ref=sr_nr_p_72_4&ds=v1%3Am%2BK%2FYVxOrvRPNaf5WkiMLnnjOaeEi6r6R9fB6Ex7aO0"
	URL_PS = "https://www.amazon.com.au/s?k=power+supplies&i=computers&bbn=4913349051&rh=n%3A4913349051%2Cp_72%3A2547913051%2Cp_n_deal_type%3A10343590051%2Cp_89%3AASUS%7CCORSAIR%7CThermaltake&dc&crid=2XW2M6CBKETD2&qid=1664800699&rnid=4910514051&sprefix=power+s%2Ccomputers%2C418&ref=sr_nr_p_6_1&ds=v1%3Ank%2FGLkPT3vCAB2XDomV3OEldLbsCtRnVSr9I%2FRVUPMI"
	URL_MBOARD = "https://www.amazon.com.au/s?k=motherboard&i=computers&bbn=4913347051&rh=n%3A4913347051%2Cp_89%3AASUS%7CGIGABYTE%7CMSI%2Cp_n_deal_type%3A10343590051%2Cp_72%3A2547913051&dc&qid=1664800768&rnid=2547911051&ref=sr_nr_p_72_2&ds=v1%3AcEaj619A4Ior2q%2BPAfEZN0VLRYQP6oswu3T%2F47JqEHk"
	
	url_list = [URL_GPU, URL_CPU, URL_RAM , URL_PS, URL_MBOARD]
	# HTTP Request
	i = 0
	for url in url_list:
		webpage = requests.get(url, headers=HEADERS)

		# Soup Object containing all data
		soup = BeautifulSoup(webpage.content, "html5lib")


		# Fetch links as List of Tag Objects
		links = soup.find_all("a", attrs={'class':'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})

		# Store the links
		links_list = []

		# Loop for extracting links from Tag Objects
		for link in links:
			links_list.append(link.get('href'))
		reduced_list = []
		
		## get the first 4 links (only wish to display 4 deals currently)
		j = 0
		while j < 4 and j < len(links_list):
			reduced_list.append(links_list[j])
			j += 1

		collection = db["Item Scraper"]
		if i == 0: category = "gpu"
		elif i == 1: category = "cpu"
		elif i == 2: category = "ram"
		elif i == 3: category = "power_supply"
		else: category = "motherboard"
		i += 1
		
		# Loop for extracting product details from each link 
		for link in reduced_list:
			new_webpage = requests.get("https://www.amazon.com.au" + link, headers=HEADERS)
			new_soup = BeautifulSoup(new_webpage.content, "html5lib")
			product = {
				"title" : get_title(new_soup),
				"source" : "https://www.amazon.com.au" + link,
				"image" : get_image(new_soup),
				"price" : get_price(new_soup),
				"normal_price" : get_normal_price(new_soup),
				"savings" : get_savings(new_soup),
				"description" : get_desc(new_soup),
				"rating" : get_rating(new_soup),
				"review_count" : get_review_count(new_soup),
				"availability" : get_availability(new_soup),
				"type": "best_buy",
				"category": category,
			}
			collection.insert_one(product)
				
		
		
