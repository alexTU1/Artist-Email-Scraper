# Artist-Email-Scraper
Sends email to specified reciever of specified artists and the songs that they are on.

<<<BEFORE STARTING: Create sample JSON file named credentials.json file>>>
*Use same key attribute names within your own credentials.json file as follows below*
	  
	  Ex: {
	  	"from": "sampleEmail@sample.com",
	  	"to": "recieverEmail@sample.com",
	  	"sender_email": "sampleEmail@sample.com",
	  	"sender_password": "strong_sample_password"
	      }

Step1: In command line of program, type in command: node artists.js /*This is where you will specify the artist(s) of your choice*/.

        Ex: node artists.js drake future gunna
	
        (only one word names will work as of now)
	*currently only works with one artist at a time*
        
Step2: Hit enter/return button on your machine

Step3: View list of json objects with artist Names and thier corresponding songs that they are on
