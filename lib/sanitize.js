'use strict';

var R = require('ramda'),

    separatorSymbol = '-',
    charactersToSubstitute = [ '.', '_' ],
    validOutputCharacters = new RegExp('[0-9a-z]|' + separatorSymbol),

    isSeparator = R.equals(separatorSymbol),

    isSubstitutableCharacter = R.contains(R.__, charactersToSubstitute),

    substituteCharacter = R.ifElse(isSubstitutableCharacter, R.always(separatorSymbol), R.identity),

    isAllowedInAppId = R.test(validOutputCharacters),

    trimExtraSeparators = R.compose(R.dropWhile(isSeparator), R.dropLastWhile(isSeparator)),

    removeConsecutiveExtraSeparators = R.dropRepeatsWith(R.both(R.equals, isSeparator));

function verifiedValidName(text) {
    var validMarathonId = /^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/;

    if (validMarathonId.test(text)) {
        return text;
    }
    throw new Error('\'' + text + '\'' + ' is not a valid marathon app id.');
}

module.exports = R.pipe(
    R.toLower,
    R.split(''),
    R.map(substituteCharacter),
    R.filter(isAllowedInAppId),
    removeConsecutiveExtraSeparators,
    trimExtraSeparators,
    R.join(''),
    verifiedValidName
);
