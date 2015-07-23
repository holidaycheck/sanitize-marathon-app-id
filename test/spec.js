'use strict';

var sanitize = require('../lib/sanitize'),
    expect = require('chai').expect;

describe('sanitizeMarathonAppId', function () {
    describe('character substitution', function () {
        it('should replace a dot within text', function () {
            expect(sanitize('a.b')).to.equal('a-b');
        });

        it('should replace multiple dots', function () {
            expect(sanitize('a.b.c.d.e')).to.equal('a-b-c-d-e');
        });

        it('should replace an underscores within text', function () {
            expect(sanitize('a_b')).to.equal('a-b');
        });

        it('should replace multiple underscores', function () {
            expect(sanitize('a_b_c_d_e')).to.equal('a-b-c-d-e');
        });

        it('should work with any combination of different non-allowed characters', function () {
            expect(sanitize('a.b_c.d_e')).to.equal('a-b-c-d-e');
        });
    });

    describe('uppercase letters', function () {
        it('should transform uppercase letters to lowercase letters', function () {
            expect(sanitize('aBcDe')).to.equal('abcde');
        });
    });

    describe('consecutive non-allowed characters', function () {
        it('should not produce multiple consecutive hyphens', function () {
            expect(sanitize('a...b')).to.equal('a-b');
            expect(sanitize('a___b')).to.equal('a-b');
            expect(sanitize('a_._b')).to.equal('a-b');
        });
    });

    describe('non-allowed, non-substitutable characters', function () {
        it('should remove any non-allowed character which is not substitutable', function () {
            expect(sanitize('fooλbar')).to.equal('foobar');
        });

        it('should remove characters outside of the basic multilingual unicode plane', function () {
            var pileOfPoo = 'a\uD83D\uDCA9';

            expect(sanitize(pileOfPoo)).to.be.equal('a');
        });
    });

    it('should reject invalid results (empty strings)', function () {
        expect(sanitize.bind(null, '')).to.throw('\'\' is not a valid marathon app id.');
    });

    it('should remove any separator at the beginning or end', function () {
        expect(sanitize('.foo_bar_')).to.equal('foo-bar');
    });

    it('should work with the combination of multiple cases', function () {
        expect(sanitize('foo.λ___BAR')).to.equal('foo-bar');
    });
});
