import { FaRegTrashAlt } from "react-icons/fa";

export const ListaTarefas = ({ tarefas, setTarefas }) => {
  //adicionar botão de completar tarefa (checkbox)
  //  guardar as informações no array corretamente, não somente a tarefa com o nome, mas também o status dela
  // adicionar ícone no botão de remoção (lixeira)
  // melhorar o design do app

  return (
    <div>
      <ul>
        {tarefas.map((item, index) => (
          <li key={item.id} className="tarefa">
            <div
              className="cor"
              style={{
                backgroundColor: item.color,
              }}
            ></div>
            {item.nome}
            <div className="icons">
              <FaRegTrashAlt
                className="lixeira"
                onClick={() => {
                  const tarefasNovo = tarefas.filter((_, i) => i !== index);
                  setTarefas(tarefasNovo);
                  localStorage.setItem("tarefas", JSON.stringify(tarefasNovo));
                }}
              />
              {item.status === "pending" ? (
                <img
                  src="./circle.svg"
                  className="circle-check"
                  onClick={() => {
                    setTarefas((prev) => {
                      const tarefasNovo = prev.map((tarefa) =>
                        tarefa.id === item.id
                          ? { ...tarefa, status: "completed" }
                          : tarefa
                      );
                      localStorage.setItem(
                        "tarefas",
                        JSON.stringify(tarefasNovo)
                      );
                      return tarefasNovo;
                    });
                  }}
                />
              ) : (
                <img
                  src="./check-circle.svg"
                  className="check-icon"
                  onClick={() => {
                    setTarefas((prev) => {
                      const tarefasNovo = prev.map((tarefa) =>
                        tarefa.id === item.id
                          ? { ...tarefa, status: "pending" } // pegue tudo q tiver no objeto e somente defina o status como pending
                          : tarefa
                      );
                      localStorage.setItem(
                        "tarefas",
                        JSON.stringify(tarefasNovo)
                      );
                      return tarefasNovo;
                    });
                  }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
