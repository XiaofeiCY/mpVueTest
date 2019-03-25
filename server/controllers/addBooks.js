const https = require('https')
const {mysql} = require('../qcloud')
// 这里处理新增图书逻辑
// 1、获取豆瓣信息
// 2、入库
// 当前豆瓣开放API 已经不开放了……所以也实现不了功能了

module.exports = async (ctx) => {
    const {isbn, openid} = ctx.request.body
    console.log('这里走不走', isbn, openid, ctx.request.body)
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSON(url)
        if (bookinfo) {
            const rate = bookinfo.rating.average
            const { title, image, alt, publisher, summary, price } = bookinfo
            const tages = bookinfo.tages.map(v => {
                return `${v.title} ${v.count}`
            }).join(',')
            const author = bookinfo.author.join(',')
            try {
                await mysql('books').insert({
                    isbn, openid, rate, title, image, alt, publisher, summary, price, tages, author
                })
                ctx.state.data = {
                    title,
                    msg: 'success'
                }
            } catch (error) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg: '新增失败：' + error.sqlMessage
                    }
                }
            }
            console.log('+++++++++++++', {
                rate, title, image, alt, publisher, summary, price, tages, author
            })
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            console.log('打印当前的傻逼', res)
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
