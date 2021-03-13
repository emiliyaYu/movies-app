class ApiService {

    getRequest = async (url) => {
        const request = await fetch(url);

        if(!request.ok) {
            throw new Error('Oops! Something went wrong...');
        }
        const text = request.json();
       return text;
    }


    getMovies = async () => {
        const data = await this.getRequest("https://api.themoviedb.org/3/movie/popular?api_key=0182a56e634228c21690fb3267265463&page=1");
        return data.results;
    }

    getMoviesById = async (data) => {
        const idData = data.map((el) => el.id);
        const allMovies = [];
        for(let i = 0; i < idData.length; i++) {
            allMovies.push(this.getRequest(`https://api.themoviedb.org/3/movie/${idData[i]}?api_key=0182a56e634228c21690fb3267265463`));
        }
        return [...await Promise.all(allMovies)];

    }

    getMoviesFromSearch = async (query) => {
        const data = await this.getRequest(`https://api.themoviedb.org/3/search/movie?api_key=0182a56e634228c21690fb3267265463&query=${query}`);
        const newData = await this.getMoviesById(data.results);
        return newData;
    }

    getChangePage = async (pageNumber) => {
        const data = await this.getRequest(`https://api.themoviedb.org/3/movie/popular?api_key=0182a56e634228c21690fb3267265463&page=${pageNumber}`);
        const newData = await this.getMoviesById(data.results);
        return newData;

    }

    getChangePageOnSearch = async (pageNumber, query) => {
        const data = await this.getRequest(`https://api.themoviedb.org/3/search/movie?api_key=0182a56e634228c21690fb3267265463&query=${query}&page=${pageNumber}`);
        const newData = await this.getMoviesById(data.results);
        return newData;
    }
}
export default ApiService;