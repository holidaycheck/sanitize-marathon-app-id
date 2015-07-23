'use strict';

var separatorSymbol = '-',
    charactersToSubstitute = [ '.', '_' ],
    validOutputCharacters = /[0-9a-z]/;

function substituteCharacter(character) {
    if (charactersToSubstitute.indexOf(character) !== -1) {
        return separatorSymbol;
    }

    return character;
}

function isAllowedInAppId(character) {
    return character === separatorSymbol || validOutputCharacters.test(character);
}

function verifiedValidName(text) {
    if (/^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/.test(text)) {
        return text;
    }
    throw new Error('\'' + text + '\'' + ' is not a valid marathon app id.');
}

module.exports = function sanitize(text) {
    var moreThanOneSeparatorSymbol = new RegExp(separatorSymbol + '{2,}', 'g'),
        separatorAtStartOrEnd = new RegExp('^' + separatorSymbol + '|' + separatorSymbol + '$', 'g');

    return verifiedValidName(
        text
        .toLowerCase()
        .split('')
        .map(substituteCharacter)
        .filter(isAllowedInAppId)
        .join('')
        .replace(moreThanOneSeparatorSymbol, separatorSymbol)
        .replace(separatorAtStartOrEnd, '')
    );
};
