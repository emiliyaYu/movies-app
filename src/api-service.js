class ApiService {
    getRequest = async (url) => {
        const request = await fetch(url);
        const text = request.json();
       return text;
    }
}
export default ApiService;