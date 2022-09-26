# adapted from https://www.digitalocean.com/community/tutorials/scrape-amazon-product-information-beautiful-soup
# Accessed 31.08.2022
# How to scrape Amazon Product Information Using Beautiful Soup
# Published by Meghna Gangwar on 04.08.2022

from cgi import print_exception
import string
from bs4 import BeautifulSoup
import requests


# Function to extract Product Title
def get_title(soup):
	
	try:
		# Outer Tag Object
		title = soup.find("span", attrs={"id":'productTitle'})

		# Inner NavigatableString Object
		title_value = title.string

		# Title as a string value
		title_string = title_value.strip()

		# # Printing types of values for efficient understanding
		# print(type(title))
		# print(type(title_value))
		# print(type(title_string))
		# print()

	except AttributeError:
		title_string = ""	

	return title_string
## Function to extract Product Image
def get_image(soup):
		
	images = soup.findAll('img')

	return images



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
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
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
		webpage = requests.get(URL_GPU, headers=HEADERS)

		# Soup Object containing all data
		soup = BeautifulSoup(webpage.content, "lxml")


		# Fetch links as List of Tag Objects
		links = soup.find_all("a", attrs={'class':'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})

		# Store the links
		links_list = []


		# Loop for extracting links from Tag Objects
		for link in links:
			links_list.append(link.get('href'))
			
		
		filename = ""
		if i == 0:filename = "gpu.txt"
		elif i == 1: filename = "cpu.txt"
		elif i == 2: filename = "ram.txt"
		elif i == 3: filename = "powersupply.txt"
		else: filename = "motherboard.txt"
		i += 1
		
		

		f = open(filename, 'w', encoding="utf-8")
		# Loop for extracting product details from each link 
		for link in links_list:

			new_webpage = requests.get("https://www.amazon.com.au" + link, headers=HEADERS)

			new_soup = BeautifulSoup(new_webpage.content, "lxml")
			print(get_image(new_soup))
			
			# Function calls to display all necessary product information
			title = "Product Title = " + get_title(new_soup) + '\n'
			f.write(title)
			# image = "Product Image = " + get_image(new_soup) + '\n'
			# f.write(image)
			price = "Product Price = " + get_price(new_soup) + '\n'
			f.write(price)
			rating = "Product Rating = " + get_rating(new_soup) + '\n'
			f.write(rating)
			reviews = "Number of Product Reviews = " + get_review_count(new_soup) + '\n'
			f.write(reviews)
			availability = "Availability = " + get_availability(new_soup) + '\n'
			f.write(availability)
			f.write("\n\n")
		
		f.close()
		print(filename + " has been completed!")
