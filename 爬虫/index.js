const express = require("express");
const app = express();
const superagent = require("superagent");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

let hotNews = []; // 热点新闻
let localNews = []; // 本地新闻

superagent.get("http://news.baidu.com/").end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`热点新闻抓取失败 - ${err}`);
  } else {
    // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
    // 抓取热点新闻数据
    hotNews = getHotNews(res);
  }
});

let getHotNews = (res) => {
  let hotNews = [];
  // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中。

  /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
   */
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $("div#pane-news ul li a").each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(), // 获取新闻标题
      href: $(ele).attr("href"), // 获取新闻网页链接
    };
    hotNews.push(news); // 存入最终结果数组
  });
  return hotNews;
};
async function fetchPageContent(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" }); // 等待页面加载完成
  const html = await page.content();
  await browser.close();

  return html;
}
fetchPageContent("https://www.pokemon.cn/play/pokedex/")
  .then((html) => {
    const $ = cheerio.load(html);
    // 这里可以继续处理获取的内容
    $(".pokemon-list .pokemon-list--box--wrapper a").each((index, item) => {
      const img = $(item).find("img").attr("src");
      let newPokemon = {
        imgUrl: `https://www.pokemon.cn${img}`,
        name: $(item).find(".pokemon-list--box__name").text(),
      };
      localNews.push(newPokemon);
    });
    const downloadFolder = path.join(__dirname, "PokemonImages");
    fs.ensureDir(downloadFolder)
      .then(() => {
        console.log(`Download folder created: ${downloadFolder}`);

        localNews.forEach((pokemon) => {
          const imagePath = path.join(downloadFolder, `${pokemon.name}.png`);
          axios({
            method: "get",
            url: pokemon.imgUrl,
            responseType: "stream",
          })
            .then((response) => {
              response.data
                .pipe(fs.createWriteStream(imagePath))
                .on("finish", () => {
                  console.log(`Image downloaded: ${imagePath}`);
                });
            })
            .catch((error) => {
              console.error(
                `Error downloading image: ${pokemon.imgUrl}`,
                error
              );
            });
        });
      })
      .catch((error) => {
        console.error("Error creating download folder:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching page:", error);
  });

app.get("/", function (req, res) {
  res.send(hotNews);
});

app.get("/pokemon", function (req, res) {
  res.send(localNews);
});
let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Your App is running at http://%s:%s", host, port);
});
