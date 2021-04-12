import instLocalStorage from "../utilts/inst-loscalStorage";
import InstLocalStore from "./local-storage";
import setIdCookies from "./cookie";
import openNotificationWithIcon from "../components/notification";

class ApiService {

    localStore = new InstLocalStore();

    basicUrl = 'https://api.themoviedb.org/3';

    apiKey = '0182a56e634228c21690fb3267265463';

    getRequest = async (url) => {
        const request = await fetch(url);

        if(!request.ok) {
            throw new Error('Oops! Something went wrong...');
        }
        const respose = request.json();
        return respose;
    }

    getGenres = async () => {
        const genresData = await this.getRequest(`${this.basicUrl}/genre/movie/list?api_key=${this.apiKey}`);
        return genresData;
    }


    getChangePageOnSearch = async (pageNumber, query) => {
        const data = await this.getRequest(`${this.basicUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${pageNumber}`);
        const dataResult = data.results;
        const totalData = data.total_results;
        return {data: dataResult, totalPage: totalData};
    }

    getRatedMovies = async (pageNumber) => {
        const guestId = instLocalStorage.get('sessionId');
        const request = await this.getRequest(`${this.basicUrl}/guest_session/${guestId}/rated/movies?api_key=${this.apiKey}&page=${pageNumber}`);
        const newData = request.results;
        const totalData = request.total_results;
        return {data: newData, totalPage: totalData};

    }

    handleAgreeSaveCookie = async() => {
        const request = await this.getRequest(`${this.basicUrl}/authentication/guest_session/new?api_key=${this.apiKey}`);
        const sessionId = request.guest_session_id;
        const expires = new Date(request.expires_at).toUTCString();
        this.localStore.setCookiesAgree();
        setIdCookies(sessionId, expires)
        this.localStore.setSessionId(sessionId)
    }

    handleSetRatedMovie = (count) => async (id, getRatedData) => {
        try {
            const request = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=0182a56e634228c21690fb3267265463&guest_session_id=${this.localStore.getSessionId()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
                body: JSON.stringify({"value": count})
            })

            if (request.ok) {
                this.localStore.setRateOfMovie(id, count)
                getRatedData(id);
            }
        }
        catch {
            openNotificationWithIcon('error', 'Rate failed.', 'Rate failed. Try again.');
        }
    }
}
export default ApiService;