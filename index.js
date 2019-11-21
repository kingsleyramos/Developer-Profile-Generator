// node modules
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user for GitHub Username and favorite color
function promptUser() {
    inquirer.prompt(
        {
            type: "input",
            name: "username",
            message: "Enter GitHub Username"
        }
        // {
        //     type: "input",
        //     name: "color",
        //     name: "Enter your favorite color"
        // }
    )
    .then(function({ username }){
        const gitProfileUrl = `https://api.github.com/users/${username}`;
        const gitRepoUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    
        axios
        .get(gitRepoUrl)
        .then(response => {
            console.log("# of public Repos: " + response.data.length);
            //console.log(response.data.);

            let stars = 0;
            response.data.forEach(function(object)  {
                stars += object.stargazers_count;
                console.log("stars: " + stars)

            })
            console.log("GitHub stars: " + stars);

        });

        axios
        .get(gitProfileUrl)
        .then(response =>{
            let location = response.data.location.replace(/ /g, "+").replace(/,/g, "")
            console.log("Profile Image: " + response.data.avatar_url);
            console.log("User name: " + response.data.login);
            console.log(`Links:
                User location via Google Map: "https://www.google.com/maps/place/${location}
                User GitHub Profile: ${response.data.html_url}
                User Blog: ${response.data.blog}`);
            console.log("bio: " + response.data.bio);
            console.log("followers: " + response.data.followers);
            console.log("following: " + response.data.following);
        })

    })
}

promptUser();

// async function start() {
//     console.log("start")
//     try {
//       const answers = await promptUser();
  
//       const html = generateHTML(answers);
  
//       await writeFileAsync("index.html", html);
  
//       console.log("Successfully wrote to index.html");
//     } catch(err) {
//       console.log(err);
//     }
//   }

// dragen1860

// Profile image = owner.avataar_url
// user name = owner.login
// Links to the following:


// User location via Google Maps = 
// User GitHub profile = 
// User blog


// User bio = bio
// Number of public repositories = public_repos
// Number of followers = followers
// Number of GitHub stars = stargazers_count
// Number of users following = following