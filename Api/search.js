const express = require('express');
const router = express.Router();



router.get('/:keyword', async (req, res) => {
    var keywordParam = req.params.keyword;
    console.log(keywordParam);

    try {


        const puppeteer = require('puppeteer');
        (async () => {
            const url = 'https://gogoanime.so//search.html?keyword=' + keywordParam //url for search result with keywordParam as search/searched text(exact searched text)
            const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
            const page = await browser.newPage();


            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.setDefaultNavigationTimeout(0);
            console.log('element')
            let requireList = await page.evaluate(() => {
                let tempRequireList = []

                names = document.querySelectorAll('.items .name')
                releases = document.querySelectorAll('.items .released')
                posters = document.querySelectorAll('.items .img >a >img')
                link = document.querySelectorAll('.items .img >a')


                for (var a = 0; a < names.length; a++) {
                    let tempMap = { name: '', release: '', link: '', poster: '' }
                    tempMap.name = names[a].textContent
                    tempMap.release = (releases[a].textContent.substring(releases[a].textContent.indexOf(':') + 1)).trim()

                    tempMap.poster = posters[a].currentSrc
                    tempMap.link = (link[a].href.substring(link[a].href.indexOf('y') + 2)).trim()
                    tempRequireList.push(tempMap)
                }

                return tempRequireList;
            })
            console.log(requireList)



            console.log('success')

            await browser.close();

            if (requireList.length > 0) { res.send(requireList) } //gives list of animes matched with searched anime and each anime data consist of name, release, stream screen link, poster link
            else { res.send() }
        })();
    }
    catch (error) { console.log(error) }

})

module.exports = router;
