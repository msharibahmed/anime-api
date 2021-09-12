const express = require('express');
const router = express.Router();



router.get('/:page', async (req, res) => {  //end point for latest episodes with page param
    var pageParam = req.params.page;
    console.log(pageParam);

    try {
        const puppeteer = require('puppeteer');
         (async () => {
             let requireList=['Loading Please Wait....']
            var url = 'https://gogoanime.lol/?page=' + pageParam // homepage or latest realase page with pageParam as home/thepagenumber 
            const browser = await puppeteer.launch({ args: ['--no-sandbox'],headless:true });
            const page = await browser.newPage();


            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.setDefaultNavigationTimeout(0);
             requireList = await page.evaluate(() => {
                let tempRequireList = []

                names = document.querySelectorAll('.items .name')
                episodes = document.querySelectorAll('.items .episode')
                posters = document.querySelectorAll('.items .img >a >img')
                link = document.querySelectorAll('.items .img >a')


                for (let a = 0; a < names.length; a++) {
                    let tempMap = { name: '', episode: '', link: '', poster: '' }
                    tempMap.name = names[a].textContent
                    tempMap.episode = episodes[a].textContent
                    tempMap.poster = posters[a].currentSrc
                    tempMap.link = link[a].href
                    tempRequireList.push(tempMap)
                }

                return tempRequireList;
            })
            console.log(requireList)



            console.log('success')

            await browser.close();
            res.send(requireList) //gives list of maps containing name, episode, poster link, stream link

        })();
    }
    catch (error) { console.log(error) }

})

module.exports = router;
