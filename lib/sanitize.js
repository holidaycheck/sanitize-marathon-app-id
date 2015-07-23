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

module.exports = function sanitize(text) {
    var moreThanOneSeparatorSymbol = new RegExp(separatorSymbol + '{2,}', 'g'),
        separatorAtStartOrEnd = new RegExp('^' + separatorSymbol + '|' + separatorSymbol + '$', 'g');

    return text
        .toLowerCase()
        .split('')
        .map(substituteCharacter)
        .filter(isAllowedInAppId)
        .join('')
        .replace(moreThanOneSeparatorSymbol, separatorSymbol)
        .replace(separatorAtStartOrEnd, '');
};
