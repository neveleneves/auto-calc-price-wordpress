# AutoCalcPriceDocPlugin.Wordpress
Auto calculation price for printing DOCX/PDF documents on your Wordpress website 
____
## Short description of plugin
This project is for convenient calculation printing cost PDF/DOCX documents. This plugin will be useful to the owners of print shops and is able to make it easier for clients to work with the website and also save them time.

**Everything the user needs to do:**
* Go to your print shop website
* Upload the document for printing in the **input-field**
* Get the total cost in the **"Total price by plugin"** field
____
## Plugin goals and capabilities
Always, the cost of printing a document depends on the number of pages in the document, the color of these pages and other factors.

**How the plugin works:**
1. Creation of two special products (B&W print / Color print) on your Wordpress website to make the plugin work and containing the price for printing one page. This price can be changed by going to the Woocommerce product menu.
2. After loading the document for printing into the **input-field**, the plugin will calculate the number of pages in the document and determine the file metadata and output this information to the console window. This information will help identify the customer to whom this order belongs.
3. The plugin will process the document page by page into a color palette and determine which pages are B&W and which pages have color elements.
4. The plugin will determine the number of color and black and white pages and calculate the total cost of printing such a document.
5. The total cost will be written in the **“Total price by plugin”** field on the product page of your Wordpress site.
____
## Installation
### Using a plugin on your site
1. The plugin can be installed by going to the **"Plugins"** tab.

![Plugin tab](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Plugins%20tab.PNG)

2. Click on the **"Add Plugin"** button.

![Add Plugin](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Add%20Plugins.PNG)

3. Find plugin in the **search-field**.

![Search plugin](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Search%20our%20plugin.PNG)
____
## Example
1. The plugin creates two special products with a print price.

![2 products](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Two%20products.PNG)

2. The price can be changed by going to the product settings.

![Change price](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Change%20price.PNG)

![Changed price](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Changed%20price.PNG)

3. Upload a file of document. 

![Input field](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Input%20field.PNG)
![Test](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Test%20file.PNG)

4. Wait a result and check the console.

![Console output](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Console%20output.PNG)

5. Get a summary price in a **"Total price by plugin"** field on your website.

![Summary](https://github.com/neveleneves/AutoCalcPriceDocPlugin.Wordpress/blob/master/img/Total%20by%20plugin.PNG)
____
## API & Libraries
### API
* [Convert API](https://www.convertapi.com/) - API for converting a file to another format.
### Libraries
* [PDF.JS](https://github.com/mozilla/pdf.js/) - library for working with PDF files.
* [RGBASTER](https://github.com/briangonzalez/rgbaster.js/) - library for analyzing images for a color palette.

**I thank the authors for the opportunity to use their technologies in the development**
____
## Plans for the future
- [ ] Handling other file formats
- [ ] Handling other sheet sizes
- [ ] Adding other functions
- [ ] Loading animation
- [ ] Optimization
- [X] Handling DOCX/PDF formats of documents
- [X] Handling color pages
- [X] Calculating the total cost
- [X] Price change per page print
