function validateCard(number) {
    var cardIssuer = cardIssuerDetails(number);
    if (cardIssuer) {
        console.log(cardIssuer.issuerName);
        return;
    }
    console.log("Couldnt validate the Card as a valid CC");
}

function cardIssuerDetails(number) {
    function ccProvider(_name, typeOfInstitution, headquarters, contact) {
        this.issuerName = _name;
        this.typeOfInstitution = typeOfInstitution;
        this.headquarters = headquarters;
        this.contactNum = contact;
    }

    var ccProviders = {
        visa: new ccProvider("Visa", "Banking Finance", "Miami", "010"),
        mastercard: new ccProvider("Mastercard", "Banking Finance", "Miami", "010"),
        discover: new ccProvider("Discover", "Banking Finance", "Miami", "010"),
        amex: new ccProvider("American Express", "Banking Finance", "Miami", "010"),
    }
    if (number.length === 16 && applyLuhnAlgo(number)) {
        console.log("Number follows a valid pattern");
        if (number.startsWith("3")) return ccProviders.amex;
        if (number.startsWith("4")) return ccProviders.visa;
        if (number.startsWith("5")) return ccProviders.mastercard;
        if (number.startsWith("6")) return ccProviders.discover;
    }
    else return null;

}
function applyLuhnAlgo(number) { //Luhn's CheckSum algo
    var totalOdd = 0, totalEven = 0; //Even and Odd total seperated for observer reading this code
    for (var i = (number.length) - 1; i >= 0; i--) {
        var currentNum = Number(number[i]);
        if (i % 2 === 1) { //If Num is odd
            totalOdd += currentNum;
            continue;
        }
        //If number is even
        var doubled = currentNum * 2;
        if (doubled > 9) {
            doubled = doubled - 9;
        }
        totalEven += doubled;
    }
    // console.log("Total Odd:" + totalOdd);
    // console.log("Total Even:" + totalEven);
    var result = totalEven + totalOdd;
    // console.log("Total: " + result);

    return result % 10 === 0;
}


// validateCard("7555555555555555");

module.exports = validateCard;