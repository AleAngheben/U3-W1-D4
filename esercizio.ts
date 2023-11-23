console.log("NEGOZIO ABBIGLIAMENTO");
console.log("----------------------");

class CapoAbbigliamento {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoivaesclusa: number;
  prezzoivainclusa: number;
  disponibile: string;
  saldo: number;

  constructor(
    _id: number,
    _codprod: number,
    _collezione: string,
    _capo: string,
    _modello: number,
    _quantita: number,
    _colore: string,
    _prezzoivaesclusa: number,
    _prezzoivainclusa: number,
    _disponibile: string,
    _saldo: number
  ) {
    this.id = _id;
    this.codprod = _codprod;
    this.collezione = _collezione;
    this.capo = _capo;
    this.modello = _modello;
    this.quantita = _quantita;
    this.colore = _colore;
    this.prezzoivaesclusa = _prezzoivaesclusa;
    this.prezzoivainclusa = _prezzoivainclusa;
    this.disponibile = _disponibile;
    this.saldo = _saldo;
  }

  getsaldocapo(): string {
    let saldo = this.prezzoivainclusa * (this.saldo / 100);
    return saldo.toFixed(2) + " €";
  }

  getacquistocapo(): string {
    let prezzoProdotto =
      this.prezzoivainclusa - parseFloat(this.getsaldocapo());
    return prezzoProdotto.toFixed(2) + " €";
  }
}

const getAbbigliamento = async function () {
  const URL = "https://mocki.io/v1/513abb31-db68-4b50-93d3-865ea73f06aa";
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta");
    }

    const data = await response.json();
    console.log("data:", data);

    let counter = 1;
    data.forEach((e: any) => {
      let prodottoAbbigliamento = new CapoAbbigliamento(
        e.id,
        e.codprod,
        e.collezione,
        e.capo,
        e.modello,
        e.quantita,
        e.colore,
        e.prezzoivaesclusa,
        e.prezzoivainclusa,
        e.disponibile,
        e.saldo
      );

      console.log("----------------------");
      console.log("Prodotto " + counter, prodottoAbbigliamento);
      console.log("Saldo da applicare", prodottoAbbigliamento.getsaldocapo());
      console.log(
        "Prezzo prodotto scontato",
        prodottoAbbigliamento.getacquistocapo()
      );

      counter++;
    });

    return data;
  } catch (error) {
    console.log("Errore nel processo", error);
  }
};

getAbbigliamento();
