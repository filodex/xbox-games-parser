import axios from 'axios'
import fs from 'fs'

let ids = await getMoreIds()
writeIdsToFile(ids)

async function getMoreIds() {
    let ids = new Set()
    let allLinks = [
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/New?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/BestRated?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/Deal?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/MostPlayed?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capabilityxboxenhanced&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capability4k&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capabilityhdr&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&NumberOfPlayers=SinglePlayer&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&NumberOfPlayers=OnlineMultiplayerWithGold&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&NumberOfPlayers=LocalMultiplayer&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&NumberOfPlayers=CoopSupportOnline&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&NumberOfPlayers=CoopSupportLocal&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=XPA&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=gamestreaming&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=consolecrossgen&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=ConsoleGen9Optimized&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopFree?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capabilityxboxenhanced&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/New?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capabilityxboxenhanced&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/New?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capability4k&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/New?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&gamecapabilities=capabilityhdr&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/Deal?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=200',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/Deal?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=400',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/TopPaid?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=0',
        'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed/Deal?Market=tr&Language=tr&ItemTypes=Game&deviceFamily=Windows.Xbox&count=2000&skipitems=600',
    ]
    console.log("Parsing id's, please wait...")
    for await (const link of allLinks) {
        let res = await axios.get(link)

        for (const iter of res.data.Items) {
            ids.add(iter.Id)
        }
    }

    console.log(`Parsed ${ids.size} id\'s from Xbox microsoft`)
    return Array.from(ids)
}

function writeIdsToFile(ids) {
    fs.writeFileSync('src/ids.json', '')
    fs.writeFileSync('src/ids.json', JSON.stringify(ids, '', ' '))
}
