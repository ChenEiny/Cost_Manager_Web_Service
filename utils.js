// Chen Einy:209533785
// Adir Mintz:316579549


/* RandomId for user in the user Schemna for key value pair*/
const generateRandomId = () => {
    const timeStamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomId = timeStamp + randomNumber
    return randomId
}

module.exports = generateRandomId