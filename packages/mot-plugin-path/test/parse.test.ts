import Path from '../src/index'

test('parse',()=>{
    expect(new Path().parse(" sdhashd")).toEqual('')
});