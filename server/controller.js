const request = require('request')

const url1 = 'http://www.dataagri.com/agriculture/subject/search.action?report.id=35-1&report.templateId=35-1&cn=class_bubble_chart&params=%7B%22years%22%3A%5B%222012%22%5D%2C%22selectIndex%22%3A0%7D'
const url2 = 'http://www.dataagri.com/agriculture/subject/search.action?report.id=35-1&report.templateId=35-1&cn=class_bubble_tab_lable_data&params=%7B%22years%22%3A%5B%222012%22%5D%2C%22selectIndex%22%3A0%7D'

getAgriculture = (method, url, data) => {
    let  options = {
        method,
        url,
        data
    }
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            } else {
                let datas = eval(body)
                let newDatas = []
                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        code1: String,
                        code2: String,
                        code3: String,
                        name1: String,
                        name2: String,
                        name3: String,
                        unit: String,
                        value: Number,
                        year: String,
                        zf: String
                    }

                    obj.code1 = datas[i].CODE1
                    obj.code2 = datas[i].CODE2
                    obj.code3 = datas[i].CODE3
                    obj.name1 = datas[i].NAME1
                    obj.name2 = datas[i].NAME2
                    obj.name3 = datas[i].NAME3
                    obj.unit = datas[i].UNIT
                    obj.value = datas[i].VALUE
                    obj.year = datas[i].YEAR
                    obj.zf = datas[i].ZF != '' ? parseFloat(datas[i].ZF).toFixed(1) + '%' : null

                    newDatas.push(obj)
                }

                resolve(newDatas)
            }
        })
    })
}

getIndustry = (method, url, data) => {
    let  options = {
        method,
        url,
        data
    }
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            } else {
                let datas = eval(body)
                let newDatas = []
                let reg = / /g

                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        code: String,
                        name: String,
                        value: String,
                        zf: String
                    }

                    obj.code = datas[i].CODE
                    obj.name = datas[i].NAME
                    obj.value = (datas[i].VALUE).replace(reg, '')
                    obj.zf = datas[i].ZF

                    newDatas.push(obj)
                }
                resolve(newDatas)
            }
        })
    })
}
        



fixAgriculture = async(ctx) => {
    let data = await getAgriculture('get', url1, '')
    ctx.status = 200
    ctx.body = {
        succsess: '成功',
        data
    }
}

fixIndustry = async(ctx) => {
    let data = await getIndustry('get', url2, '')
    ctx.status = 200
    ctx.body = {
        succsess: '成功',
        data
    }
}

module.exports = {
    fixAgriculture,
    fixIndustry
}