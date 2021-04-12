import instLocalStorage from "../utilts/inst-loscalStorage";

class InstLocalStore  {

   setCookiesAgree = () => instLocalStorage.set('isCookieSendingAgree', 'true')

   getCookieAgree = () => instLocalStorage.get('isCookieSendingAgree')

   setSessionId = (sessionId) => instLocalStorage.set('sessionId', sessionId)

   getSessionId = () => instLocalStorage.get('sessionId')

   getSessionIdOfValue = (id) => instLocalStorage.get(id)

   setPersonalData = (data) => instLocalStorage.set('personalData', data)

   getPersonalData = () => instLocalStorage.get('personalData');

   setRateOfMovie = (id, count) => instLocalStorage.set(id, count)
}
export default InstLocalStore;