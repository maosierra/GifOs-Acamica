const apikey = 'VGV16gAxmvVNiaQDsAlPqSFtInXbLyqA';
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=3`;

export async function getTrendings() {
    const response = await fetch(pathTendencias);
    const tendencias = await response.json();
    return tendencias.data;
}

export async function getGiftsByText(campo, offset) {
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=10&q=${campo}&offset=${offset}&rating=g&lang=es`;
    const response = await fetch(pathBusqueda);
    const gifs = await response.json();
    return gifs.data;
}

export async function getGifById(id) {
    const pathBusqueda = `https://api.giphy.com/v1/gifs/${id}?api_key=${apikey}`;
    const response = await fetch(pathBusqueda);
    const gif = await response.json();
    return gif.data;
}