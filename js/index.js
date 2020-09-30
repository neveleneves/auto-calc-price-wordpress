//Import rgbaster.js library for analyze image files
import analyze from 'rgbaster'

//Create XMLHttpRequest.open prototype
const xmlOpen = window.XMLHttpRequest.prototype.open;

//Price array for calc a full price
const price = [];

//Getting a new cookie with a price of plugin products
const getCookie = (nameCookie) => {
    //Price array from plugin products 
    const matchesCookie = document.cookie.match(new RegExp("(?:^|; )" + nameCookie.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matchesCookie ? decodeURIComponent(matchesCookie[1]) : console.log("Price value - not found");
}

//Inserting a prices of plugin products for price array
const catchPrice = (cookieValue) => {
    //Array with SKU varable of plugin products 
    const priceProducts = ["BWPrice", "ColorPrice"];
    //Inserting price to price array
    if(!cookieValue) alert("Cookie files - disabled")
    else priceProducts.forEach(priceCookie => {
        price.push(getCookie(priceCookie));
    });
}
catchPrice(document.cookie);

//Interception of requests 
window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
 this.addEventListener('load', function() {
     try {
        console.log("_______________________ NEW ORDER _______________________");
        //Get to object from transformation JSON
        const responseObj = JSON.parse(this.responseText);
        //Catch a URL of file 
        const url = catchFileURL(responseObj);
        //Get a format of file and get info about file
        getFormat(responseObj, url);
     } catch(error) {
        console.log(`Something wrong - ${error}`);
     }
 }); 
 return xmlOpen.apply(this, arguments);
}

//Catching a URL of upload file 
const catchFileURL = obj => {
    //If the response status is true - get URL of the uploaded file
    if (obj["status"] === true) {
        const urlFile = obj["file"]["url"];
        //console.log(urlFile);
        return urlFile;
     } else console.log("Error: File is not upload");
} 

//Getting a format of file
const getFormat = (obj, url) => {
    const format = obj["file"]["file_name"].split('.').pop();
    if (format === 'pdf') {
        getMetadata(url, format);
    } else if (format === 'doc' || format === 'docx') {
        convert(url, format);
    } else console.log("This format is not supported");
}

//Asynchronous conversion of doc/docx to pdf and pdf to image 
async function convert(fileURL, format) {
    //Using a Convert API for converting files to another format
    //Secret code for use a trial-version API
    let convertApi = ConvertApi.auth({secret: '4Bqw9aBNpF9bZaas'});
    let params = convertApi.createParams();
    params.add('File', new URL(`${fileURL}`));
    
    if (format === 'doc' || format === 'docx') {
        let result = await convertApi.convert('docx', 'pdf', params);
        let url = result.files[0].Url;
        getMetadata(url);
    } 
    else if (format === 'pdf') {
        let result = await convertApi.convert('pdf', 'jpg', params);
        analyzeImg(result);
    }
}

//Analyzing images for color by using RGBaster lib
async function analyzeImg(fileArr) {
    let colorPages = 0;
    let bwPages = 0;
    for (const fileItem of fileArr.files) {
        //Analyzing a each page from document
        const result = await analyze(`${fileItem.Url}`, { scale: 0.5 });
        if (result.length <= 256) bwPages++;
        else if (result.length > 256) colorPages++;
    }
    console.log(`Count of Black&White pages: ${bwPages}`);
    console.log(`Count of Color pages: ${colorPages}`);

    calcFullPrice(bwPages, colorPages);
}

//Calculating full price for whole document 
async function calcFullPrice(bw, color) {
    const fullPrice = (bw * price[0]) + (color * price[1]);
    console.log(`Full price for all pages from document is: ${fullPrice}`);

    //Print a full price on page 
    printFullPrice(fullPrice);
}

//Inserting a summary value on the site
const printFullPrice = (summaryVal) => {
    /* Attention! This function adds to form second total field by plugin. 
    If that not meaning for you - simple use a fullPrice variable for your needs*/
    const markup = `
    <ul>
        <li class="wcpa_total">
            <span>Total price by plugin: </span>
            <span class="wcpa_price_outer">
                <span class="wcpa_price">
                    <span class="price_value">${summaryVal}</span>
                    <span class="woocommerce-Price-currencySymbol">₽</span>
                </span>
            </span>
        </li>
    </ul>`;
    const totalClass = document.querySelector('.wcpa_price_summary');

    if (!totalClass) alert("Summary field - not found. Please, add a summary field to the form");
    else totalClass.insertAdjacentHTML('beforeend', markup);
}

//Getting a metadata and total count of pages whole document 
const getMetadata = (url) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "../libs/pdfjs/build/pdf.worker.js";
 
    pdfjsLib.getDocument(url).promise.then(pdf => {
        //Getting a document metadata 
        pdf.getMetadata().then(data => {
            try {
            //console.log(data); 
            console.log(`
            Metadata:
            * Author: ${data.info.Author}  
            * Creation Date: ${data.info.CreationDate}
            * Format Version: ${data.info.PDFFormatVersion}
            * Creator Tool: ${data.metadata._metadataMap.get("xmp:creatortool")}
            * Producer: ${data.metadata._metadataMap.get("pdf:producer")}`);
            } catch (error) { 
                console.log(`Metadata - not available.`); 
            }
        });   
        convert(url, 'pdf'); 
        return pdf;
    })
    .then(pdf => {
        //Calculating a total count of pages in document  
        const numPages = pdf.numPages;
        console.log(`Total number pages in document: ${numPages}`);
        return numPages;
    });
}