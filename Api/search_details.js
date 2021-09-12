const express = require('express');
const router = express.Router();



router.get('/:url', async (req, res) => {
    var urlParam = req.params.url;
    console.log(urlParam);

    try {


        const puppeteer = require('puppeteer');
        (async () => {
            const url = 'https://gogoanime.lol/category/' + urlParam //url for about anime detail with urlParam as searchdetails/name of series with small letters and '-' at places other than letters and numbers
            const browser = await puppeteer.launch({ args: ['--no-sandbox'],headless:true });
            const page = await browser.newPage();


            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.setDefaultNavigationTimeout(0);
            console.log('element')
            let requireList = await page.evaluate(() => {
                let tempRequireList = []

                var types = document.querySelectorAll('.anime_info_body_bg .type')
                var totalEpisodes = document.querySelectorAll('.anime_video_body >ul >li')

                let tempMap = { type: '', summary: '', genre: [''], status: '', other: '', totalEpisode: '' }

                if (totalEpisodes.length >= 1) {
                    lastEpisode = totalEpisodes[totalEpisodes.length - 1].innerText
                    tempMap.totalEpisode = lastEpisode.substring(lastEpisode.indexOf('-') + 1);

                }
                type = types[0].innerText
                summary = types[1].innerText
                genre = types[2].innerText
                status = types[4].innerText
                other = types[5].innerText

                tempMap.type = type.substring(type.indexOf(':') + 1).trim()
                tempMap.summary = summary.substring(summary.indexOf(':') + 1).trim()
                tempMap.genre = genre.substring(genre.indexOf(':') + 1).trim()
                tempMap.status = status.substring(status.indexOf(':') + 1).trim()
                tempMap.other = other.substring(other.indexOf(':') + 1).trim()

                tempRequireList.push(tempMap)


                return tempRequireList;
            })
            console.log(requireList)



            console.log('success')

            await browser.close();
            res.send(requireList) //gives list of a single map consist of anime-type,summary,genre,status(completed or not),other name, total number of episodes
        })();
    }
    catch (error) { console.log(error) }

})

module.exports = router;
