# adapted from https://www.digitalocean.com/community/tutorials/scrape-amazon-product-information-beautiful-soup
# Accessed 31.08.2022
# How to scrape Amazon Product Information Using Beautiful Soup
# Published by Meghna Gangwar on 04.08.2022

from cgi import print_exception
import string
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient

# Connect to the database.
MONGO_URL="mongodb+srv://username:8lSW02qSgVdZG5fQ@team-45-cluster.usr52zy.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URL)
db = client['Team-45-Cluster']

# Function to extract Product Title
def get_title(soup):
	try:
		# Outer Tag Object
		title = soup.find("span", attrs={"id":'productTitle'}).string.strip()
		# # Printing types of values for efficient understanding
		# print(type(title))
		# print(type(title_value))
		# print(type(title_string))
		# print()
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

# gets all search result items
def new_egg_items(title, category):
	new_egg_url_prefix = "https://www.newegg.com/global/au-en/p/pl?d="
	cur_category = ""
	# defining each url trail for categories on new egg so that incorrect
	# parts are not found in the search
	graphics_card_category = "&N=100203018&isdeptsrh=1"
	cpu_category = "&N=100203101&isdeptsrh=1"
	motherboard_category = "&N=100203007"
	power_category = "&N=100203050&isdeptsrh=1"
	ram_category = "&N=100203071&isdeptsrh=1"
	
	#checking which category is being passed in the current iteration on the amazon scraper
	if category == "gpu":
		cur_category = graphics_card_category
	elif category == "cpu":
		cur_category = cpu_category
	elif category == "motherboard":
		cur_category = motherboard_category
	elif category == "power":
		cur_category = power_category
	else:
		cur_category = ram_category	

	short_title = title
	
	adapt_title = short_title.replace(" ", "+")
	if (adapt_title[-1] == "+"):
		adapt_title[-1] = ""
	search_url = new_egg_url_prefix + adapt_title + cur_category
	page = requests.get(search_url, headers=HEADERS)
	egg_soup = BeautifulSoup(page.content, 'html5lib')
	items = egg_soup.find_all('a', attrs={'class':'item-title'})
	return items


# returns the links for the items found in the search if there is any
def new_egg_links(items):
	links = []
	# check for no results in search
	if (items == []):
		return "No Matches"
	# check for only 1 search result
	elif len(items) == 1:
		link = items[0].get('href').split(' ')[0]
		links.append(link)
		return links
	else:
		for item in items:
			link = item.get('href').split(' ')[0]
			links.append(link)
		return links

def new_egg_best_result(links, title, new_egg_title):
	# storing the data for product with best match
	best_title = ""
	best_rating = ""
	best_image = ""
	if links == []:
		return "no matches"
	else:
		current_best_score = 0
		best_result = ""
		desired = title

		for link in links:
			page = requests.get(link, headers=HEADERS)
			soup = BeautifulSoup(page.content, 'html5lib')
			new_title = soup.find('h1', attrs={'class':'product-title'}).text
			score = fuzz.token_sort_ratio(new_title,desired)
			if (score > current_best_score):
				best_result = link
				current_best_score = score
				best_title = new_title
				best_rating = new_egg_rating(soup)
				best_image = new_egg_image(soup)

		
		return best_result, best_title, best_rating, best_image
def new_egg_price(soup):
	price = soup.find('div', attrs={'class': 'price-current'}).text
	if price:
		return price.strip('AUD')
	else:
		return " "
def new_egg_rating(soup):
	rating = soup.find("div", attrs={"class":"product-rating"}).find("i")['title']
	#rating = rating_soup['title']
	if rating:
		return rating
	else:
		return "no rating found"
		
def new_egg_image(soup):
	try:	
		image = soup.find("div", attrs={"class":'swiper-zoom-container'}).find("img", attrs={"class": 'product-view-img-original'})
		source = image['src']
	except AttributeError:
		source = ""
	return source


if __name__ == '__main__':

	# Headers for request
	HEADERS = ({'User-Agent':
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
				'Accept-Language': 'en-US'})

	# The webpage URL
	URL_GPU = "https://www.amazon.com.au/s?k=graphics+card&i=computers&rh=n%3A4913341051%2Cp_n_feature_browse-bin%3A10500702051%7C10500703051%7C10500707051%7C10500708051%2Cp_n_feature_two_browse-bin%3A10584340051%7C10584341051%7C10584343051%2Cp_72%3A2547913051&dc&crid=3S4CAVV0ZCU5B&qid=1663857345&rnid=2547911051&sprefix=graphics%2Caps%2C325&ref=sr_nr_p_72_2&ds=v1%3AKCM0CQnMzoaH%2FdbHc3QJhTz%2BvW27Z0wJJpMjRqyXt2U"
	URL_CPU = "https://www.amazon.com.au/s?k=cpu&i=computers&bbn=4913338051&rh=n%3A4913338051%2Cp_89%3AAMD%7CIntel%2Cp_72%3A2547913051&dc&qid=1663857416&rnid=2547911051&sprefix=graphics%2Caps%2C325&ref=sr_nr_p_72_2&ds=v1%3ABIE%2BhsL9GaE9rwLRhmrxPbLLzuB8TXeECoj2kO09sas"
	URL_RAM = "https://www.amazon.com.au/s?k=ram&i=computers&bbn=4913306051&rh=n%3A4913306051%2Cp_89%3ACORSAIR%7CGLOBAL+MEMORY%7CKingston%2Cp_72%3A2547913051&dc&qid=1663857447&rnid=2547911051&ref=sr_nr_p_72_2&ds=v1%3AZyC4otDzyRhhmm0zIxMf%2FaBs%2FXP%2BL9v9jLl56oT0HFA"
	URL_PS = "https://www.amazon.com.au/s?k=power+supply&i=computers&bbn=4913306051&rh=n%3A4913306051%2Cp_89%3ACORSAIR%7CCooler+Master%7CThermaltake%7Cbe+quiet%21%2Cp_72%3A2547913051&dc&qid=1663857474&rnid=2547911051&ref=sr_nr_p_72_2&ds=v1%3A%2FcOo3TSW6vbWcb0TxbhYcNJa%2FPJKS0U%2BPolMT5nRv8k"
	URL_MBOARD = "https://www.amazon.com.au/s?k=motherboard&i=computers&bbn=4851683051&rh=n%3A4851683051%2Cn%3A4913306051%2Cn%3A4913347051%2Cp_89%3AASRock%7CASUS%7CCORSAIR%7CGIGABYTE%7CMSI%2Cp_72%3A2547913051&dc&crid=3KNEAN8KC2MWS&qid=1663857518&rnid=2547911051&sprefix=motherboar%2Caps%2C346&ref=sr_nr_p_72_2&ds=v1%3AZrf2nFxzEoCeGbHjeojNUN0ulKXUkPnfcq7e6F58L3I"
	
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

		# category for use in new egg scraping
		category = ""
		## to make use of reduced list, see line 164
		## vvvv Currently not in use, but potentially will be used if we reduce number of products scraped  vvvv
		## get the first 8 links
		j = 0
		while j < 20:
			reduced_list.append(links_list[j])
			j += 1
			
		# Insert output to MongoDB
		gpu = db["GPU Scraper"]
		cpu = db["CPU Scraper"]
		ram = db["RAM Scraper"]
		power_supply = db["Power Supplies Scraper"]
		motherboard = db["Motherboard Scraper"]
		
		# category assignment is for the new egg scraping implementation
		collection_name = ""
		if i == 0:
			collection_name = gpu
			category = "gpu"
		elif i == 1: 
			collection_name = cpu
			category = "cpu"
		elif i == 2: 
			collection_name = ram
			category = "ram"
		elif i == 3: 
			collection_name = power_supply
			category = "power"
		else: 
			collection_name = motherboard
			category = "motherboard"
		i += 1
		
		# Loop for extracting product details from each link 
		for link in reduced_list:
			new_webpage = requests.get("https://www.amazon.com.au" + link, headers=HEADERS)
			new_soup = BeautifulSoup(new_webpage.content, "html5lib")
			
			# store amazon title to use when scraping new egg
			title = get_title(new_soup)

			# new egg data scraped vvvvvvvvvvvvvvv
			items = new_egg_items(title, category)
			#print(items)
			links= new_egg_links(items)
			new_egg_title = ""
			rating = ""
			image = ""
			result, new_egg_title, rating, image = new_egg_best_result(links, title, new_egg_title)
			print("new egg source: " + result)

			
			if result == "no matches":
				print("no matches found")
			else:
				page = requests.get(result, headers=HEADERS)
				soup = BeautifulSoup(page.content, 'html5lib')
				new_price = new_egg_price(soup)
				print("new egg title: " + new_egg_title)
				print("new egg price: " + new_price)
				print("new egg rating: " + rating)
				print("new egg image: " + image)
			# new egg data finised scraping ^^^^^^^^^^^^^^^

			product = {
				"title" : get_title(new_soup),
				"source" : "https://www.amazon.com.au" + link,
				"image" : get_image(new_soup),
				"price" : get_price(new_soup),
				"description" : get_desc(new_soup),
				"rating" : get_rating(new_soup),
				"reviews_no" : get_review_count(new_soup),
				"availability" : get_availability(new_soup),
			}
			collection_name.insert_one(product)
