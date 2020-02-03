function soma(a,b){
    return a+b;
}

test('Deveria retornar soma de 2 numeros',() => {
    const result = soma(4,5);
    expect(result).toBe(9);
});
