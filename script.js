document.querySelector('.seach form').addEventListener('submit', async (event)=> {
    event.preventDefault();
    clearShow()
    showInfo('Carregando...');

    let seach =  document.querySelector('#inputSeach').value

    if (seach !== '') {
        let url = `http://www.omdbapi.com/?t=${encodeURI(seach)}&apikey=3242ceb0`
        
        let result = await fetch(url);
        let json = await result.json();

        if (json.Title !== undefined) {
            showMovie({
                title: json.Title,
                plot: json.Plot,
                poster: json.Poster,
                data: json.Released, 
                run: json.Runtime
            })
        }else{
            showInfo('Não encontrado');
            
        }
    } 
});

function showMovie(json) {
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.contInfo').style.display = 'flex';

    document.querySelector('.contInfo h3').innerHTML = `${json.title}`;
    document.querySelector('.movieDesc').innerHTML = `${json.plot}`;
    document.querySelector('.movieBanner img').setAttribute('src', `${json.poster}`);   
    document.querySelector('.dataMovie').innerHTML = `Lançamento: ${json.data}`;
    document.querySelector('.runMovie').innerHTML = `Duração: ${json.run}`;
}
function showInfo(msg) {
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.loading').innerHTML = `${msg}`;
    
}
function clearShow(){
    document.querySelector('.contInfo').style.display = 'none';
}