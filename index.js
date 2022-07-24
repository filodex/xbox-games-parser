/**
 *  По каждой игре сделать запрос на цену
 */

import axios from 'axios'
import fs from 'fs'

let ids_origin = JSON.parse(fs.readFileSync('src/ids.json'))
let ids_nums = [
    1, 2, 3, 4, 4, 14, 215, 1252, 1, 5, 32, 5, 1, 52, 35, 13, 35312, 35, 1, 5,
    15, 32, 543, 654, 56, 45, 62, 3, 562, 46, 32, 6, 1246, 3, 461, 6, 214, 61,
    6, 16, 3, 6, 234, 63, 64, 43, 6, 346, 3, 6, 3, 6, 34, 66, 3,
]
await getGameInfoByIds(ids_origin)

// Получит массив любого размера и по каждому элементу отправит запрос
async function getGameInfoByIds(ids_origin) {
    let ids = [...ids_origin]
    if (!ids || !Array.isArray(ids)) {
        console.log("Please provide Id's array")
        return
    }
    // Разделить айдишники по 10шт
    function splitIdsByTen(arr) {
        let arr_allBlocks = []
        let block = []
        for (const iter of arr) {
            if (block.length === 10) {
                arr_allBlocks.push(block)
                block = []
            }
            block.push(iter)
        }
        arr_allBlocks.push(block)
        return arr_allBlocks
    }
    let ids_splittedByTen = splitIdsByTen(ids)

    let gamesInfo = []
    for await (const blockOfTen of ids_splittedByTen) {
        // Запрос на 10 айдишников
        let linkInfo = `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${blockOfTen.toString()}&market=TR&languages=tr-tr&MS-CV=DGU1mcuYo0WMMp+F.1`
        let res = await axios.get(linkInfo)

        // Упорядочивание инфы
        let products = res.data.Products
        for (const product of products) {
            let info = {}
            info.id = product.ProductId
            let sku = product.DisplaySkuAvailabilities[0].Sku
            info.title = sku.LocalizedProperties[0].SkuTitle
            info.lastModifiedDate = sku.LastModifiedDate
            info.firstAvailableDate = sku.MarketProperties[0].FirstAvailableDate
            info.price =
                product.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price

            gamesInfo.push(info)
            console.log(info.title)
        }
        fs.writeFileSync(
            'src/fullInfo.json',
            JSON.stringify(gamesInfo, '', ' ')
        )
        console.log(gamesInfo.length)
    }
}
