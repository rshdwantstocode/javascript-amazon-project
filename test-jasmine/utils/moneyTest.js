import { moneyMatters } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', ()=> {
    it('convert cents into dollars', ()=>{
        expect(moneyMatters(2095)).toEqual('20.95');
    });

    it('works with zero', ()=>{
        expect(moneyMatters(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', ()=>{
        expect(moneyMatters(2000.5)).toEqual('20.01');
    });
});