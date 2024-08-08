import { useState } from "react";
import "./App.css";
import { ListaTarefas } from "./ListaTarefas";

function App() {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
  const [tarefas, setTarefas] = useState(tarefasSalvas || []);
  const [textoTarefa, setTextoTarefa] = useState("");
  const [filtro, setFiltro] = useState("all");

  // criar um array de tarefas filtradas (FEITO)
  // criar um filtro e um select, pro usuário escolher quais tarefas ele quer ver (FEITO)
  // Fazer o estado do filtro e select ficarem alinhados (FEITO)

  const tarefasFiltradas = tarefas.filter(
    (item) => filtro === "all" || item.status === filtro
  );

  const gerarCorAleatoria = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const addTarefa = () => {
    const tarefasNovo = [
      ...tarefas,
      {
        nome: textoTarefa,
        status: "pending",
        color: gerarCorAleatoria(),
        id: new Date().getTime(),
      },
    ];
    setTarefas(tarefasNovo);
    localStorage.setItem("tarefas", JSON.stringify(tarefasNovo));
    setTextoTarefa("");
  };
  return (
    <>
      <div className="input">
        <input
          type="text"
          value={textoTarefa}
          onChange={(e) => setTextoTarefa(e.target.value)}
        />{" "}
        <button onClick={addTarefa}>Adicionar</button>
      </div>
      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="all">Todas</option>
        <option value="pending">Pendentes</option>
        <option value="completed">Concluídas</option>
      </select>

      <ListaTarefas tarefas={tarefasFiltradas} setTarefas={setTarefas} />
    </>
  );
}

export default App;
