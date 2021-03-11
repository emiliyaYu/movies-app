class ApiService {
    getRequest = async (url) => {
        const request = await fetch(url);
        if(!request.ok) {
            throw new Error('Oops! Something went wrong...');
        }
        
        const text = request.json();
       return text;
    }
}
export default ApiService;