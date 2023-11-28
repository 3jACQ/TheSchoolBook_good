export async function fetchIPFS(cid : string) {
    const gateways = [
        "https://cloudflare-ipfs.com/ipfs/",
        "https://ipfs.io/ipfs/",
    ]

    let i = 0
    let url = gateways[i] + cid
    let res = await fetch(url)
    while (res.status !== 200 && i < gateways.length) {
        i++
        url = gateways[i] + cid
        res =  await fetch(url, { cache: 'force-cache' })
    }

    if (res.status !== 200) {
        return null
    }

    return res
}