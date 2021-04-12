
const setIdCookies = (sessionId, expires) => {document.cookie = `sessionId=${sessionId};path=/;expires=${expires}`}
export default setIdCookies;