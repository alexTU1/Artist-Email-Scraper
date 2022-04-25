var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');

var takeFirstTwo = process.argv.splice(0,2); // gets rid of first two arguments
var artistNames = process.argv; //array of artist names
var lowerCase = [] //array used for storing lowercased elements from artistNames array
artistNames.forEach(element=>{ // for every element in artistNames array
    lowerCase.push(element.toLowerCase()); //take the element, lowercase it, then add it to the lowerCase array
});

request('http://www.popvortex.com/music/charts/top-rap-songs.php', function (error, response, html) {
	if (!error && response.statusCode == 200) {
       var $ = cheerio.load(html);
       $('em.artist').each(function(i, element){  //pulling artists names
            const chartLength = 25;
            const stringName = $(this).text(); //gets names of artists from site
            const stringSong = $(this).siblings('cite.title').text(); //gets accompaning song name from site

            const multiplExist = lowerCase.every(value =>{
                return stringName.includes(value);
            });
           // console.log(multiplExist);

        //    const output = `
        //    <h3>Your REQUEST!</h3>
        //    <p>You chose the Artist(s): ${artistNames}</p>

        //    `;
            
           if(i<chartLength && stringName.toLowerCase().includes(lowerCase) || stringSong.toLowerCase().includes(lowerCase)){  
                //console.log("Artist(s) Name: " + stringName + "\nSong-Title    : " + stringSong);

                let artistArr = {
                    artist: stringName,
                    song: stringSong
                };

                if(artistNames.length > 0){
                    console.log(artistArr);
                }else{
                    console.log("Artist not specified...");
                    console.log();
                    process.exit(1);
                }
                    console.log(); 

                    const url = './credentials.json' //directory to credentials.json object (credentials.json file MUST be local)
                    let json = require(url); //grabs credentials.json object 

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth:{
                            user: json.sender_email, //credential.json attribute(sender_email)
                            pass: json.sender_password //credential.json attribute(sender_password)
                        }
                    });

                    let mailOptions = {
                        from: json.from, //credential.json attribute(from)
                        to: json.to, //credential.json attribute(to)
                        subject: "Your Artist(s) are/is: " + artistNames ,
                        text: "Artist(s): " + stringName + '\n' + 
                            "Song: " + stringSong
                        } 
                        
                        transporter.sendMail(mailOptions, function(err, data){
                            if(err){
                                console.log(err.message);
                            }else{
                                console.log("Email has been successfully sent!!");
                            }
                        });
            }    
        }); 
	}
});
