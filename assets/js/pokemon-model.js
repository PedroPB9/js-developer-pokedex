
/* A lista de detalhes da pokeapi contém muitas info que não usarei, então para simplificar,
criei essa classe que apresenta a estrutura necessária de informações que preciso por pokemon */
class Pokemon {
    namee;
    number;
    types = []; //um poke pode possuir mais de 1 tipo
    type; //tipo principal do poke, define a cor do bakcground
    photo;

    constructor(nm, nb, tps, pht) {
        this.namee = nm;
        this.number = nb;

        const typs = tps.map((typeSlot) => typeSlot.type.name); /* typs recebe um array
        com os tipos em str que estavam dentro da lista types e da lista 0 ou 1 ou 2... */
        const [type] = typs; /* == this.types.get(0);  DESTRUCTURING ASSIGNEMENT -> TYPE == typs[0]*/

        this.types = typs; /* passo pro constructor uma lista(types) com outra(s) lista(s) dentro(0, 1) que possui tipo(s)  
        em json, aplico para cada item da lista(types) o 0 ou 1.type.name*/
        this.type = type; /*o princripal é 0 */

        this.photo = pht; 
    }
}
