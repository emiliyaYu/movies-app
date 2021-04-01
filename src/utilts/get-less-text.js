const getLessText = (text) => {
    let newString = '';
    if (text.length > 220) {
        newString += `${text.substr(0, 170)  } ...`
    }
    else {
        newString += text;
    }
    return newString;
}
export default getLessText;
