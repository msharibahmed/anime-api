const express = require('express');
const router = express.Router();



router.get('/:episode', async (req, res) => {
    var episodeParam = req.params.episode;
    console.log(episodeParam);

    try {


        const puppeteer = require('puppeteer');
        (async () => {
            const url = 'https://gogoanime.lol/' + episodeParam //URL for stream screen for particular episoode and also to the downloading link screen epispodeParam as episode/one-piece-special-episode-1(EXAMPLE)
            const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
            const page = await browser.newPage();


            await page.goto(url, { waitUntil: 'networkidle2' });
            page.setDefaultNavigationTimeout(0);

            console.log('element')

            let download_link = await page.evaluate(() => {
                let download_link = document.querySelectorAll('.dowloads > a ')[0].href
                return download_link;
            })

            await page.goto(download_link, { waitUntil: 'networkidle2', timeout: 0 });
            page.setDefaultNavigationTimeout(0);

            console.log(download_link)

            console.log('success')
            let download_link_list = await page.evaluate(() => {

                let downloads = []
                let download_links2 = document.querySelectorAll('.dowload >a')

                for (let a = 0; a < download_links2.length; a++) {

                    let tempMap = { link: '', quality: '' }

                    if ((download_links2[a].href).indexOf('token') !== -1) {
                        tempMap.link = download_links2[a].href
                        tempMap.quality = download_links2[a].innerText
                        downloads.push(tempMap)

                    }

                }



                return downloads
            })
            console.log(download_link_list)

            await browser.close();
            res.send(download_link_list) //gives link of all different download links of that particular episode which can be used to stream or download
        })();
    }
    catch (error) { console.log(error) }

})

module.exports = router;
