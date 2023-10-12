import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";
import SelectInput from "./SelectInput";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id
    const [categoria, setCategoria] = useState(props.cliente?.categoria ?? '')
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [preco, setPreco] = useState(props.cliente?.preco ?? 0)
    return (
        <div>
            {id ? (
                <Entrada 
                    somenteLeitura
                    texto="Código" 
                    valor={id} 
                    className="mb-5"
                />
            ) : false}            
            <SelectInput 
                texto="Categoria" 
                tipo="select"
                valor={categoria} 
                valorMudou={setCategoria}
                className="mb-5"
            />
            <Entrada 
                texto="Nome" 
                valor={nome} 
                valorMudou={setNome}
                className="mb-5"
            />
            <Entrada 
                texto="Preço" 
                tipo="number" 
                valor={preco} 
                valorMudou={setPreco}
            />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2" 
                    onClick={() => props.clienteMudou?.(new Cliente(nome, categoria, +preco, id))}
                >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}